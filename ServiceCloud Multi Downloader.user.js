// ==UserScript==
// @name        ServiceCloud Multi Downloader
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scmultid
// @description Forces download of all Attachements from the "Outbound Email Message" view
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Multi%20Downloader.user.js
// @include     https://esko.my.salesforce.com/*
// @include     https://*.force.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.githubusercontent.com/ccloli/832a8350b822f3ff5094/raw/abc01526232e05368bf8c75165d8d14606674f41/GM_download_polyfill.js
// @version     10
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_xmlhttpRequest
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
		if (typeof GM_download !== 'undefined') {
			GM_download(jQuery(this).attr("href"), trim(FileName[FileName.length-1]));
		} else {
			SaveToDisk(jQuery(this).attr("href"), trim(FileName[FileName.length-1]));

		}
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

