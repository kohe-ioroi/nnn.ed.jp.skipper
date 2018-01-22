function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    skip: document.getElementById("settingform").skip.value,
    autostart: document.getElementById("settingform").autostart.value,
    playedalert: document.getElementById("settingform").playedalert.value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.skip=="True"){document.getElementById("skip_true").setAttribute("checked","true")}else{document.getElementById("skip_false").setAttribute("checked","true")};
    if (result.autostart=="True"){document.getElementById("autostart_true").setAttribute("checked","true")}else{document.getElementById("autostart_false").setAttribute("checked","true")};
    if (result.playedalert=="True"){document.getElementById("alert_true").setAttribute("checked","true")}else{document.getElementById("alert_false").setAttribute("checked","true")};
  };
  function onError(){};
  browser.storage.local.get().then(setCurrentChoice, onError);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
