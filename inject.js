var slideImgs = document.getElementsByClassName('slide-image');
var titleH1 = document.getElementsByClassName('slideshow-title-text');
var titleSpan = titleH1[0].getElementsByTagName('span');
var title = titleSpan[0].textContent.replace(/_/g, " ").trim();
var slideHeight = slideImgs[0].height;
var slideWidth = slideImgs[0].width;
var slideImgsSrc = [];


for(var i = 0; i < slideImgs.length; i++){
   let srcMaxRes = slideImgs[i].srcset;
   slideImgsSrc[i] = srcMaxRes.slice(srcMaxRes.lastIndexOf('https'), srcMaxRes.lastIndexOf(' '));
   // slideImgsSrc[i] = slideImgs[i].src;
   if(i == slideImgs.length-1){
      chrome.runtime.sendMessage({slides: slideImgsSrc});
   }
}



