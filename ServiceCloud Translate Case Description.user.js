// ==UserScript==
// @name        ServiceCloud Translate Case Description
// @author      bevi@esko.com
// @namespace   com.esko.bevi.sctranslate
// @description Translates the Description field using DeepL (from EN, DE, FR, ES, IT, NL, PL to EN)
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/blob/master/ServiceCloud%20Translate%20Case%20Description.user.js
// @include     https://esko.my.salesforce.com/support/console/*
// @include     https://esko--accept.cs83.my.salesforce.com/support/console/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @connect     deepl.com
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var cuscode = jQuery('.efhpFieldValue').last().text().trim();

try {
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://www.deepl.com/jsonrpc",
		onload: function(response) {
			try {
			} catch (e) {
			}
		}
	});
} catch (e) {
}
