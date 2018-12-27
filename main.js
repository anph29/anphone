chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    //|(5[689])
    const regex = // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi,
      /(0|o|O|\+84)(\s|\.)?((3[2-9])|(7[0oO6-9])|(8[1-5])|(9[oO0-9]))([oO0-9]{1})(\s|\.)?([oO0-9]{3})(\s|\.)?([oO0-9]{3})\b/g,//phone
      //1. all match  
      matched = request.source.match(regex),
      //2. đeuplicated
      matchedSet = new Set(matched),
      //3. convert to array to use
      anphoneArr = Array.from(matchedSet)
        .map(no => no.replace(/[.\s]/g, '').replace('+84', '0'));
    if (!anphoneArr.length) anphone += '<li>Not found!</li>';
    else getExistedFilter(filterLs => {//filter existed
      const withoutMatched = anphoneArr.filter(matched => -1 === filterLs.indexOf(matched))
      if (!withoutMatched.length) anphone += '<li>Not found!</li>';
      else withoutMatched.forEach(no => { anphone.innerHTML += `<li>${no}</li>` })
    })
  }
});
window.onload = () => {
  var toggle = false;
  var time;
  toggle = !toggle;
  if (toggle) time = setInterval(function () { chrome.tabs.executeScript(null, { code: 'window.scrollBy(0, 1000);' }); }, 1000);
  else {
    clearInterval(time);

    ///////////////////////////////
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, { file: "getPagesSource.js" }, () => {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }
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