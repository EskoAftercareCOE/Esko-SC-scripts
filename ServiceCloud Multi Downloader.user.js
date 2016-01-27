// ==UserScript==
// @name        ServiceCloud Multi Downloader
// @namespace   com.esko.bevi.scmultid
// @description Forces download of all Attachements from the "Outbound Email Message" view
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Multi%20Downloader.user.js
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     4
// @grant       none
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);

document.addEventListener("DOMNodeInserted", function () {
    var attTitle = jQuery("h3[id$='EmailMessageUi$RelatedEmailMessageAttachmentList_title']");

    if(!attTitle.has("button").length) {
        attTitle.append("<button name=\"button\" id=\"scmultid\" onclick=\"DownloadAll\" style=\"margin-left: 1em;\">Download all</button>");
        document.getElementById('scmultid').addEventListener('click', DownloadAll, false);
    }
}, false);


function DownloadAll() {
    jQuery("a.actionLink:contains('View')").each(function( index ) {
        var FileName = jQuery(this).attr("title").split("-");
        SaveToDisk(jQuery(this).attr("href"), trim(FileName[FileName.length-1]));
    });    
}

/// SaveToDisk taken from http://muaz-khan.blogspot.com/2012/10/save-files-on-disk-using-javascript-or.html
function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        try {
            var evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
        } catch (e) {
            window.open(fileURL, fileName);
        }

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}
