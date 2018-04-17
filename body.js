function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function getNowVideoId() {
    var Ele = getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul');
    var l = Ele.childNodes.length;

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
function nextEvent() {
    getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul/li[' + (getNowVideoId() + 1) + ']/a').click();
}
function eventInfo(id) {
    var _temp = getElementByXpath('/html/body/div[1]/div[3]/div[2]/div/div[2]/div[1]/div[1]/ul/li[' + id + ']/a').offsetParent.className;
    if (_temp == "movie") {
        return "Movie";
    } else if (_temp == "evaluation-test") {
        return "EvalTest";
    } else if (_temp == "movie good") {
        return "Finish";
    } else if (_temp == "essay-test") {
        return "EssayTest";
    } else {
        return False;
    }
}
setInterval(function () {
    if (eventInfo(getNowVideoId()) == "Video" || eventInfo(getNowVideoId()) == "Finish") {
            nextEvent();
    } else if (eventInfo(getNowVideoId()) == "EvalTest" || eventInfo(getNowVideoId()) == "EssayTest") {
        
    } else { }
}, 5000);
