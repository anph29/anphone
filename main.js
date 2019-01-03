var time;
chrome.runtime.onMessage.addListener(function (request, sender) {
  switch (request.action) {
    case 'getSource':
      proccessHTMLData(request.source);
      break;
    case 'endScroll':
      _GO();
      break;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  time = chrome.tabs.executeScript(null, { file: 'scrollDown.js' });

  document.getElementById('btn_go').addEventListener('click', e => { _GO() })
  document.getElementById('selectable').addEventListener('click', e => { selectText('selectable') })
});

const _GO = () => {
  chrome.tabs.executeScript(null, { file: "getPagesSource.js" }, () => {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    var message = document.querySelector('#message');
    if (chrome.runtime.lastError)
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
  });
}

const proccessHTMLData = source => {
  //|(5[689])
  const regex = // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi,
    /(0|o|O|\+84)(\s|\.)?((3[2-9])|(7[0oO6-9])|(8[1-5])|(9[oO0-9]))([oO0-9]{1})(\s|\.)?([oO0-9]{3})(\s|\.)?([oO0-9]{3})\b/g,//phone

    //1. all match  
    matched = source.match(regex),
    //2. đeuplicated
    matchedSet = new Set(matched),
    //3. convert to array to use
    anphoneArr = Array.from(matchedSet)
      .map(no => no
        .replace(/[.\s]/g, '')
        .replace(/(\+84|o|O)/g, '0')
      );

  if (!anphoneArr.length) anphone += '<li>Not found!</li>';
  else getExistedFilter(filterLs => {//filter existed
    const withoutMatched = anphoneArr.filter(matched => -1 === filterLs.indexOf(matched))
    anphone.innerHTML = "";
    if (!withoutMatched.length) anphone += '<li>Not found!</li>';
    else withoutMatched.forEach(no => { anphone.innerHTML += `<li>${no}</li>` })
  })
}
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

const selectText = containerid => {
  if (document.selection) { // IE
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
