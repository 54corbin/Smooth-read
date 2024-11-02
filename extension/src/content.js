console.info("/home/corbin/Development/smooth-read/dist/content.js");
import "./lib.js";

const div = document.createElement("div");
div.id = "main";
document.body.appendChild(div);

import init from "./assets/dioxus/smooth-read.js";

const wasmUrl = chrome.runtime.getURL("smooth-read_bg.wasm");
console.log("wasmUrl=", wasmUrl);

init(wasmUrl).then((wasm) => {
  if (wasm.__wbindgen_start == undefined) {
    wasm.main();
  }
});

//--------the below is not in use-------------
function extractTextNodes(node) {
  const allNodes = [];

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      allNodes.push(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    }
  }
  traverse(node);
  return allNodes;
}

//nodes2update: {sub_dict:[{}],strange_words:[{node_index:3,sub_dict_index:2,word:"hello"}]}
//update the original text node
function updateTextNodes(allTextNodes, nodes2update) {
  const strange_words = nodes2update.strange_words;
  const sub_dict = nodes2update.sub_dict;

  //groupedStrangeWords: [{0:{sub_dict_index:2, word:"hello"}}]
  const groupedStrangeWords = strange_words.reduce((acc, cur) => {
    const groupKey = cur.node_index;
    acc[groupKey] = acc[groupKey] || []; //Create a new group if it doesn't exist
    acc[groupKey].push(cur); // Add the current word to the group
    return acc;
  }, {});
  // console.info("groupedWords:", groupedStrangeWords);

  // traverse all strange words and let them highlighted in original place.
  for (const [node_index, strangeWords] of Object.entries(
    groupedStrangeWords,
  )) {
    const wordsToTranslate = strange_words.map((w) => w.word);
    // console.info("wordsToTranslate=", wordsToTranslate);
    const originalTextNode = allTextNodes[node_index];
    let remained_originalText = originalTextNode.textContent;
    const originalWords =
      originalTextNode.textContent.match(/\b[a-zA-Z]+(?:-[A-Za-z]+)*\b/g) || [];
    originalTextNode.textContent = "";
    console.info("originalWords=", originalWords);
    for (const originalWord of originalWords) {
      if (wordsToTranslate.includes(originalWord)) {
        const splits = remained_originalText.split(originalWord);
        originalTextNode.parentNode.append(splits[0]);
        remained_originalText = splits[1];
        showTranslationWhenHovering(
          originalTextNode,
          originalWord,
          strangeWords,
          sub_dict,
        );
      }
    }
    originalTextNode.parentNode.append(remained_originalText);
  }
}

//create and attach a dropdown on hovering
function showTranslationWhenHovering(
  originalTextNode,
  originalWord,
  strangeWords,
  sub_dict,
) {
  const span = createSpanToHighlightWord(originalWord);
  originalTextNode.parentNode.append(span);
  originalTextNode.parentNode.append(" ");

  const sub_dict_index = strangeWords.find(
    (item) => item.word === originalWord,
  ).sub_dict_index;

  showTranslationWhenMouseover(span, sub_dict, sub_dict_index, originalWord);

  hideTranslationWhenMouseout(span);
}

function showTranslationWhenMouseover(
  span,
  sub_dict,
  sub_dict_index,
  originalWord,
) {
  span.addEventListener("mouseover", function highlightedWordOnMouseover() {
    span.style.backgroundColor = "#FFE0A9";
    // span.style.opacity = 0.3;
    window.translationTimerHandler = setTimeout(() => {
      // console.log("sub_dict_index=", sub_dict_index);

      //to remove the old one
      if (window.translationDropdown) {
        document.body.removeChild(window.translationDropdown);
      }
      window.translationDropdown = createDropdown(
        span,
        sub_dict[sub_dict_index],
      );
      document.body.appendChild(window.translationDropdown);

      // add on click listener to the checkbox
      var checked = document.getElementById(originalWord);
      // console.log("checked=", checked);
      checked.addEventListener("click", function () {
        // console.log("check and collect id=", this.id);

        span.onmouseover = null;
        chrome.runtime.sendMessage(
          {
            action: "mark_word_as_known",
            data: { user_id: 1, word: this.id },
          },
          (response) => {
            span.removeEventListener("mouseover", highlightedWordOnMouseover);
            span.style.color = "";
            span.style.backgroundColor = "";
            document.body.removeChild(window.translationDropdown);
            window.translationDropdown = null;
            console.log("response from background:", response);
          },
        );

        console.log("sent successfully");
      });

      // to keep the dropdown open even if mouse is moved out of the span(the highlighted word)
      window.translationDropdown.addEventListener("mouseover", () => {
        // console.log("clear timer:", window.translationTimerHandler);
        clearTimeout(window.translationTimerHandler);
      });
      window.translationDropdown.addEventListener("mouseout", () => {
        window.translationTimerHandler = setTimeout(() => {
          if (!window.translationDropdown) return;
          span.style.backgroundColor = "";
          document.body.removeChild(window.translationDropdown);
          window.translationDropdown = null;
        }, 500);

        // console.log("set timer:", window.translationTimerHandler);
      });
    }, 500);

    // console.info("set timer:", window.translationTimerHandler);
  });
}

function hideTranslationWhenMouseout(span) {
  span.addEventListener("mouseout", () => {
    span.style.backgroundColor = "";

    console.info("clear timer", window.translationTimerHandler);
    //to prevent the dropdown from closing immediately enven if mouse is over the dropdown translation
    clearTimeout(window.translationTimerHandler);
    window.translationTimerHandler = setTimeout(() => {
      if (window.translationDropdown) {
        span.style.backgroundColor = "";
        document.body.removeChild(window.translationDropdown);
        window.translationDropdown = null;
      }
    }, 500);

    // console.info("set timer:", window.translationTimerHandler);
  });
}

function createSpanToHighlightWord(originalWord) {
  const span = document.createElement("span");
  span.textContent = originalWord;
  span.classList.add("smooth-highlight"); // add a class for styling
  span.style.color = "#ff0008";
  // span.style.color = "#ff7008";

  return span;
}

function createDropdown(node2attach, content) {
  const dropdown = document.createElement("smooth-read-div");
  dropdown.classList.add("smooth-dropdown");
  dropdown.textContent = content;

  const rect = node2attach.getBoundingClientRect();
  // console.info("node2attach rec=", rect);
  let left = rect.left - rect.width * 2;
  if (left < 0) {
    left = 0;
  }

  let viewportWidth = window.innerWidth;

  console.log(`left=${left}, \t viewportWidth=${viewportWidth}`);
  if (left + rect.width * 4 > viewportWidth) {
    console.log(">>>>>>>>left=", left);
  }

  let viewportHeight = window.innerHeight;

  let top = rect.bottom + 5;

  console.log(`top=${top}, \t viewportHeight=${viewportHeight}`);
  if (top > viewportHeight - 200) {
    top = top - 5 - rect.height - 5;
  }

  dropdown.style.left = left + "px";
  dropdown.style.top = top + "px";
  dropdown.style.width = "35ch";
  dropdown.style.zIndex = "99999999999999999";
  dropdown.style.padding = "20px";
  dropdown.style.position = "fixed";
  dropdown.style.backgroundColor = "#ffffff";
  dropdown.style.borderRadius = "10px";
  dropdown.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.3)";

  console.log("translation:", content);
  dropdown.innerHTML = `
  <style>
    svg:hover {
        fill: #ff7008;
    }
    
  </style>
  <smooth-read-div >
    <smooth-read-div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-content: center; justify-content: space-between;align-items: stretch; border-bottom: 1px solid #ccc; margin-bottom: 10px">
      <smooth-read-h3 style="margin-top: 0px;">
      <smooth-read-b style="font-weight: bold">${content["word"]}</smooth-read-b>
      </smooth-read-h3>
      <smooth-read-div id="check_collect">
        <svg id="${
          node2attach.textContent
        }" xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        </svg>
        <svg id="${
          node2attach.textContent
        }" xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>
      </smooth-read-div>
    </smooth-read-div>
    <smooth-read-p>
      <smooth-read-span style="white-space: break-spaces">UK:/${content["phonetic"]}/    US:/${content["phonetic"]}/</smooth-read-span>
    </smooth-read-p>
    <smooth-read-pre style=" white-space: pre-line; text-align: left;">
      ${content["translation"].trim()}
    </smooth-read-pre>
  </smooth-read-div>`;

  return dropdown;
}

function run() {
  const allTextNodes = extractTextNodes(document.body).filter(
    (node) => node.textContent.trim().length > 5,
  );
  const words = allTextNodes.map((node) => node.textContent);

  //request server to translate
  chrome.runtime.sendMessage(
    {
      action: "parse_text_node",
      data: { user_email: "helll@gmail.com", text_nodes: words },
    },
    (response) => {
      console.log("response from background:", response);
      updateTextNodes(allTextNodes, response);
    },
  );
}

// run();
