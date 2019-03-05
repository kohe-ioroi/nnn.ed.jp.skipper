// 前提関数(機能簡略)
/// Xpathでエレメントを取得する
function getElementByXpath(path) { return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
/// 文字列をブーリアンに変換する
function parseStrToBoolean(str) { return (str == 'true') ? true : false; }
//設定取得と動作開始
function onGot(item) {
    if (item.skip) {
        skip = parseStrToBoolean(item.skip);
    }
    if (item.autostart) {
        autostart = parseStrToBoolean(item.autostart);
    }
    if (item.playedalert) {
        playedalert = parseStrToBoolean(item.playedalert);
    }
    if (item.automute) {
        automute = parseStrToBoolean(item.automute);
    }
    work()
};
// 設定取得エラー発生時の処理
function onError(error) { console.log("設定の読み込み時に例外が発生しました)") };

// 現在再生しているVideoIdをXpathで取得する
function getNowVideoId() {
    var l = getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul').childNodes.length;
    for (var i = 1; i < l; i++) {
        var _className = getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul/li[' + i + ']/a').className;
        if (_className == "is-selected") {
            var videoid = i;
            break;
        } else {
        }
    }
    return videoid;
}

// 次のVideoIdにジャンプする
function nextEvent() { getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul/li[' + (getNowVideoId() + 1) + ']/a').click(); }

// クラス名からイベントの種類を確認する
// movie=動画,movie good=再生済みの動画,evaluation-test=選択問題,essay-test=記述問題,それ以外=該当しないので処理なし
function eventInfo(id) {
    var _temp = getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul/li[' + id + ']/a').offsetParent.className;
    if (_temp == "movie") {
        return "Video";
    } else if (_temp == "movie good" || _temp == "evaluation-test good" || _temp == "essay-test good") {
        return "Finish";
    } else if (_temp == "evaluation-test") {
        return "EvalTest";
    } else if (_temp == "essay-test") {
        return "EssayTest";
    } else {
        return false;
    }
}

//メイン動作
function work() {
    setInterval(function () {
        if (eventInfo(getNowVideoId()) == "Video" || eventInfo(getNowVideoId()) == "Finish") {
            if (skip == true) {
                nextEvent();
                choiceOK = false;
            }
        } else if (eventInfo(getNowVideoId()) == "EvalTest" || eventInfo(getNowVideoId()) == "EssayTest") {
            if (playedalert == true && choiceOK == false) {
                alert("選択問題もしくは記述問題を回答してください");
                choiceOK = true;
            }
        } else {
            if (playedalert == true && choiceOK == false) { }
        }
    }, 2000);
}
//グローバル関数で定義
var skip
var autostart
var playedalert
var automute
var choiceOK
var getting = browser.storage.local.get();
getting.then(onGot, onError);