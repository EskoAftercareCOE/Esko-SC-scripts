// ==UserScript==
// @name        ServiceCloud Clean View Toolbar
// @author      bevi@esko.com
// @namespace   com.esko.bevi.sctbar
// @description Save some space at the top by combining/masking objects
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_addStyle
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);


document.addEventListener("DOMNodeInserted", function () {
	jQuery("input[name='assign']").hide();
	jQuery(".rolodex").hide();
	jQuery(".filterLinks").prepend(jQuery(".refreshListButton"));
	jQuery(".refreshListButton").css({'background-image' : 'url(https://esko.my.salesforce.com/img/alohaSkin/sync.png)', 'height' : '22px', 'margin' : '0', 'margin-right' : '1em'});
},
						  false);


