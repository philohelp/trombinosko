chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "fetch_images") {
    const images = Array.from(document.getElementsByTagName("img"));
    const imageUrls = images.map((img) => img.src);
    const filtered = imageUrls.filter((url) => !url.includes("logo"));
    sendResponse({ imageUrls: filtered });
  }
});
