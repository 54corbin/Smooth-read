window.send_message_to_bg = (action, data, callback) => {
  console.log("sending message to background...");
  // console.log("action:", action, "data:", data);
  // callback({ aaa: 111 });
  chrome.runtime.sendMessage(
    {
      action: action,
      data: data,
    },
    (response) => {
      // console.log("response from background:", response);
      callback(response);
      // updateTextNodes(allTextNodes, response);
    },
  );
};
