function onError(error) {}
function onGot(item) {
  var skip = "True";
  var autostart = "True";
  var playedalert = "True";
  if (item.skip) {
    var skip = item.skip;
  }
  if (item.autostart) {
    var autostart = item.autostart;
  }
  if (item.playedalert) {
    var playedalert = item.playedalert;
  }
  if (skip!="True" && autostart!="True" && playedalert!="True"){
  }else{
    document.body.style.border = "5px solid red";
  }
  if(!document.evaluate('//*[@id="nextMovie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotLength){
    if(!document.evaluate('//*[@id="nextTest"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotLength){
      if(playedalert=="True"){
        alert("レポート・設問の回答を行ってください。");
      }
      else{
      };
    }else{
      try {
        if(autostart=="True"){
          setTimeout(function(){document.getElementsByClassName('play_state_wait')[0].click();} ,1000);
        }else{
        };
      }
      catch(e){};
      if (skip=="True"){
        setInterval(function(){
          document.getElementById('nextTest').click();
        }, 1000);
      }else{

      };
    }
  }else{
    try {
      setTimeout(function(){
        document.getElementsByClassName('play_state_wait')[0].click();
      } ,1000);
    }
    catch(e){
    };
    if (skip=="True"){
      setInterval(function(){
        document.getElementById('nextMovie').click();
      }, 1000);
    }else{
    };
  }

}
var getting = browser.storage.local.get();
getting.then(onGot, onError);
