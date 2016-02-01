// ==UserScript==
// @name        ServiceCloud Declutter close form
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scdeclutt.close
// @description Hide some panels from ServiceCloud's case closing form
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


if (/^Case Edit\: ([0-9]{8}) ~ Salesforce - Unlimited Edition$/i.test(jQuery(document).attr('title'))) {
	var targets = ["#head_2_ep", "#head_3_ep", "#head_4_ep", "#head_5_ep", "#head_6_ep", "#head_7_ep", "#head_8_ep", "#head_9_ep"];
	jQuery.each(targets, function( index, value ) {
		//jQuery(value).css("background-color", "red"); 
		jQuery(value).children().first().prepend("<button name=\"button\" id=\"scunfold_"+value.substring(1)+"\" style=\"margin-right: 1em;\">+</button>");
		//document.getElementById('scunfold_'+value.substring(1)).addEventListener('click', myToggle(value), false);
		jQuery(value).next().toggle();

	});
}


function myToggle() {
alert(value);
}