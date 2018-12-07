chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    //|(5[689])
    const regex = // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi,
      /(0|o|O|\+84)(\s|\.)?((3[2-9])|(7[0oO6-9])|(8[1-5])|(9[oO0-9]))([oO0-9]{1})(\s|\.)?([oO0-9]{3})(\s|\.)?([oO0-9]{3})\b/g,//phone
      //1. all match  
      matched = request.source.match(regex),
      //2. đeuplicated
      matchedSet = new Set(matched),
      //. convert to array to use
      anphoneArr = Array.from(matchedSet);
    if (!anphoneArr.length) anphone += 'Not found!';
    else getExistedFilter(filterLs => {//filter existed
      anphoneArr.filter(matched => -1 === filterLs.indexOf(matched))
        .forEach(no => { anphone.innerHTML += `<li>${no.replace(/[.\s]/g, '')}</li>` })
    })
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

const getExistedFilter = callback => {
  const url = chrome.runtime.getURL('data/filter.json');
  fetch(url)
    .then(response => response.json()) //assuming file contains json
    .then(callback);
};

const updateFilter = callback => {
  const url = chrome.runtime.getURL('data/stub.txt');
  fetch(url)
    .then(response => response) //assuming file contains json
    .then(function (txt) {
      console.log(txt)
    });
}