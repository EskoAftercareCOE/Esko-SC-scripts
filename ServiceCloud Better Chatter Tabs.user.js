// ==UserScript==
// @name        ServiceCloud better chatter tabs
// @author      bevi@esko.com
// @namespace   com.esko.bevi.betterchatter
// @description Hides, moves or renames some objects in the publisher toolbar of the feed view
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @include     /^http(s)?:\/\/(esko--accept\.cs83\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @version     1
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Better%20Chatter%20Tabs.user.js
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==



this.$ = this.jQuery = jQuery.noConflict(true);

$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
	return function( elem ) {
		return $(elem).text().match("^" + arg + "$");
	};
});


waitForKeyElements ("#cas7_ileinner", init);

function init() {
	if (($(".labelCol:textEquals('Status')").next().text()) !== "New") {
		$('a[onclick*="Case.Start_working"]').parent().toggle();
	}
	$("span.optionLabel:textEquals('Post')").text("Esko");
	$("span.optionLabel:textEquals('Community')").text("Customer");
	$("span.optionLabel:textEquals('New Phone Call')").text("Phone");
	$("span.optionLabel:textEquals('New Task')").text("Task");
	$('a[onclick*="Case.CaseComment"]').parent().after($('a[onclick*="FeedItem.ContentPost"]').parent());
	$('a[onclick*="FeedItem.ContentPost"]').parent().after($('a[onclick*="NewTask"]').parent());


	if ($('ul.dropdownContainer').has('li').length === 0){
		$('li.dropdownOption').toggle();
	}
}
