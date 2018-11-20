chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    //|(5[689])
    const matched = request.source.match(/(0((3[2-9])|(7[06-9])|(8[1-5])|(9[0-9])))+([0-9]{7})\b/g),
      matchedSet = new Set(matched);


    message.innerText = Array.from(matchedSet).join(';;');
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;


