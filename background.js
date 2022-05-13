
chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.tabs.executeScript(activeTab.id, {
    file: 'inject.js'
  });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.executeScript(tab.ib, {
      file: 'lib.js'
    });
  }
});

function handleMessage(request) {
  var slides = request.slides;
  var slideImgsData = [];
  for(var i = 0; i < slides.length; i++){
    imageToUri(slides[i], i, function(uri, iterator) {
      slideImgsData[iterator] = uri;
      if(slideImgsData.length == slides.length){
        for(var j=0; j < slideImgsData.length; j++){
          console.log('checking');
          console.log(slideImgsData[j]);
          if(slideImgsData[j]){
            console.log('ok');
          } else {
            console.log('break');
            break;
          }
        }
        console.log('j ' + j);
        if(j==slideImgsData.length){
          console.log(slideImgsData);
          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {response: slideImgsData});
          });
        }
      }
    });
  }
}

function imageToUri(url, iterator, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  var base_image = new Image();
  base_image.crossOrigin="anonymous"
  base_image.src = url;
  base_image.onload = function() {
      canvas.width = base_image.width;
      canvas.height = base_image.height;
      ctx.drawImage(base_image, 0, 0);
      callback(canvas.toDataURL('image/png'), iterator);
      canvas.remove();
  }
}

chrome.runtime.onMessage.addListener(handleMessage);