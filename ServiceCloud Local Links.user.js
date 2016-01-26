// ==UserScript==
// @name        ServiceCloud Local Links
// @namespace   com.esko.bevi.scloclinks
// @description Changes links to jobfolders to local links
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Local%20Links.user.js
// @include     https://esko.my.salesforce.com/*
// @version     4
// @grant       none
// ==/UserScript==


document.addEventListener("DOMNodeInserted", function () {
    var protos = ["file://///", "smb://"];
    var j = 0;
    var links = document.getElementsByTagName("a");
    for (var i = 0, imax = links.length; i < imax; i++) {
        if (/^http:\/\/esko-graphics\.com\/globalstorage\/CC-SW-Problemlog-Gent.*$/i.test(links[i].href)) {
            links[i].href = links[i].href.replace("http://", protos[j]);
            j++;
        }
    }
},
                          false);
