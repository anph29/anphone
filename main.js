chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    //|(5[689])
    const regex = /(0|o|O|\+84)(\s|\.)?((3[2-9])|(7[0oO6-9])|(8[1-5])|(9[oO0-9]))([oO0-9]{1})(\s|\.)?([oO0-9]{3})(\s|\.)?([oO0-9]{3})\b/g,
      matched = request.source.match(regex),
      matchedSet = new Set(matched),
      anphoneArr = Array.from(matchedSet);
    if (!anphoneArr.length)
      anphone += 'Not found!';
    else
      anphoneArr.forEach(no => { anphone.innerHTML += `<li>${no}</li>` })
  }
});

window.onload = () => {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

};


