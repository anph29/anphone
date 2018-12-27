window.scrollBy({ top: 5000, behavior: 'smooth' });
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
  chrome.runtime.sendMessage({ action: "endScroll" });