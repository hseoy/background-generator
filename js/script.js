var bgWrapperClass = ".background-wrapper";
var colorPickerClass = ".gradient-color-picker";
var currentBgClass = ".current-background";
var clipboardWrapperClassFull = bgWrapperClass + "__clipboard-wrapper";

var bgWrapper = document.querySelector(bgWrapperClass);
var clipboardWrapper = document.querySelector(clipboardWrapperClassFull);
var copiedTooltip = document.querySelector(bgWrapperClass + "__copied-tooltip");
var currentBg = document.querySelector(bgWrapperClass + "__current-background");
var currentBgContent = document.querySelector(currentBgClass + "__content");
var colorFirst = document.querySelector(colorPickerClass + "__color-first");
var colorSecond = document.querySelector(colorPickerClass + "__color-second");
var colorRandom = document.querySelector(colorPickerClass + "__color-random");
var currentBgClipBoard = null;

function setGradient(color1, color2) {
  bgWrapper.style.background =
    "linear-gradient(to right, " + color1 + ", " + color2 + ")";
  currentBgContent.textContent = bgWrapper.style.background;
  if (ClipboardJS.isSupported()) {
    currentBg.setAttribute("data-clipboard-text", bgWrapper.style.background);
  }
}

function getRandomRgb() {
  var rgbDec = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
  var rgbHex = "#";

  rgbDec.forEach(function (decValue) {
    var hexValue = decValue.toString(16);
    rgbHex += hexValue.length < 2 ? "0" + hexValue : hexValue;
  });

  return rgbHex;
}

function randomGradient() {
  var color1 = getRandomRgb();
  var color2 = getRandomRgb();
  setGradient(color1, color2);
  colorFirst.value = color1;
  colorSecond.value = color2;
}

function specificGradient() {
  var color1 = colorFirst.value;
  var color2 = colorSecond.value;
  setGradient(color1, color2);
}

function showCopiedTooltip() {
  copiedTooltip.style.display = "block";
}

function hideCopiedTooltip() {
  copiedTooltip.style.display = "none";
}

colorFirst.addEventListener("input", specificGradient);
colorSecond.addEventListener("input", specificGradient);
colorRandom.addEventListener("click", randomGradient);

if (ClipboardJS.isSupported()) {
  currentBgClipBoard = new ClipboardJS(currentBg);
  clipboardWrapper.addEventListener("mouseleave", hideCopiedTooltip);
  currentBgClipBoard.on("success", showCopiedTooltip);
} else {
  hideCopiedTooltip();
  currentBg.style.cursor = "default";
}

randomGradient();
