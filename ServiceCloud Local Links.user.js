// ==UserScript==
// @name        ServiceCloud Local Links
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scloclinks
// @description Changes links to jobfolders to local links
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Local%20Links.user.js
// @include     https://esko.my.salesforce.com/*
// @version     5
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
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
