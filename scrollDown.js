function scrollDown() {
  window.scrollBy({ top: 5000, behavior: 'smooth' });
  setTimeout(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      chrome.runtime.sendMessage({ action: "endScroll" });
    else scrollDown();
  }, 2000)
}

scrollDown();