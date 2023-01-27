var sponsoredDivId = "x1lliihq";
var mainEl = document.querySelector(`[role="main"]`);

function removeAd(el) {
  el.style.display = "none";
  el.style.width = "0";
  el.style.height = "0";
}

function clearAds() {
  var suggestedItems = Array.from(mainEl.getElementsByClassName(sponsoredDivId))
    .filter(x => x.nodeName.toLowerCase() === "div");

  suggestedItems.forEach(item => {
    if (item.textContent.indexOf("Suggested for you") > -1
      || item.textContent.indexOf("Reels and short videos") > -1) {
      removeAd(item);
    }
  });

  var evilSvgIds = Array
    .from(document.getElementsByTagName("text"))
    .filter(x => x.outerHTML.toLowerCase().indexOf("sponsored") > -1)
    .map(x => x.id);

  var sponsoredSVGs = Array
    .from(mainEl.getElementsByTagName("svg"))
    .filter(x => {
      var outer = x.outerHTML.toLowerCase();
      return evilSvgIds.some(id => outer.indexOf('#' + id.toString()) > -1);
    });

  sponsoredSVGs
    .map(x => x.closest("div." + sponsoredDivId))
    .forEach(x => removeAd(x));
}

clearAds();

var mainLength = mainEl.outerHTML.length;

function checkNewLengthAndClearAds() {
  if (mainEl.outerHTML.length !== mainLength) {
    clearAds();
    mainLength = mainEl.outerHTML.length;
  }

  window.setTimeout(checkNewLengthAndClearAds, 1000);
}

window.setTimeout(checkNewLengthAndClearAds, 1000);