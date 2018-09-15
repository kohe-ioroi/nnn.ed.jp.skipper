function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    skip: document.getElementById("settingform").skip.value,
    playedalert: document.getElementById("settingform").playedalert.value,
    // autostart: document.getElementById("settingform").autostart.value,
    // automute: document.getElementById("settingform").automute.value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.skip == "true") {
      document.getElementById("skip_true").setAttribute("checked", "true")
    } else {
      document.getElementById("skip_false").setAttribute("checked", "true")
    };
    if (result.playedalert == "true") {
      document.getElementById("alert_true").setAttribute("checked", "true")
    } else {
      document.getElementById("alert_false").setAttribute("checked", "true")
    };
    // if (result.autostart == "true") {
    //   document.getElementById("autostart_true").setAttribute("checked", "true")
    // } else {
    //   document.getElementById("autostart_false").setAttribute("checked", "true")
    // };

    //   if (result.automute == "true") {
    //     document.getElementById("automute_true").setAttribute("checked", "true")
    //   } else {
    //     document.getElementById("automute_false").setAttribute("checked", "true")
    //   };
  };

  function onError() { };
  browser.storage.local.get().then(setCurrentChoice, onError);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);