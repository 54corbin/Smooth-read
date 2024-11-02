/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
console.info(
  "/home/corbin/Development/smooth-read/extension/src/background.js",
);

function sendHttpRequest(method, url, dat, callback) {
  console.log("send:", method, url, dat);
  fetch(url, {
    method: method,
    body: JSON.stringify(dat),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log("server resp=", response);
      callback(response);
      return response;
    })
    .catch((error) => {
      console.error(error, "send failed");
    });
}

// receive messages from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage:", message);
  switch (message.action) {
    case "parse_text_nodes":
      sendHttpRequest(
        "POST",
        "http://127.0.0.1:4545/webpage",
        message.data,
        sendResponse,
      );
      break;
    case "mark_word_as_known":
      sendHttpRequest(
        "POST",
        "http://127.0.0.1:4545/vocabulary",
        message.data,
        sendResponse,
      );
      break;
    default:
      console.error("unsupported action:", message.action);
  }
  return true;
});

/******/ })()
;
//# sourceMappingURL=background.js.map