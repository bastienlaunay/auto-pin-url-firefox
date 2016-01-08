require("sdk/simple-prefs").on("listUrls", onPrefChange);

var tabs = require("sdk/tabs");
var preferences = require('sdk/simple-prefs').prefs;
var urls = preferences.listUrls;

var checkToPin = function (tab) {

    var pinurls = JSON.parse(JSON.stringify(urls.split(",")).replace(' ', '').replace(/,? ?""/g, ''));

    for (var i in pinurls) {
        if (!pinurls.hasOwnProperty(i) || pinurls[i] == '')
            continue;

        if (tab.url.match(pinurls[i])) {
            tab.pin();
            break;
        }
    }
};

function onPrefChange() {
    preferences = require('sdk/simple-prefs').prefs;
    urls = preferences.listUrls;
    initCheckToPin();
}

var initCheckToPin = function () {
    tabs.on("ready", checkToPin);
};

initCheckToPin();