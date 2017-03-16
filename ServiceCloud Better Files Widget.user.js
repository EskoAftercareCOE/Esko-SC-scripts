// ==UserScript==
// @name        ServiceCloud Better Files Widget
// @author      bevi@esko.com
// @namespace   com.esko.bevi.betterfiles
// @description Makes the files widget use all the available vertical space
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @include     /^http(s)?:\/\/(esko--accept\.cs83\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @version     2
// @downloadURL #####https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Better%20Chatter%20Tabs.user.js
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);

$("head").append ('<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/redmond/jquery-ui.min.css" rel="stylesheet" type="text/css">');


$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
	return function( elem ) {
		return $(elem).text().match("^" + arg + "$");
	};
});


waitForKeyElements ('div.eFilesWidget', init);


function init() {
	$('div.eFilesWidget > div.eWidgetBody').css( "height", "100%" );
	$('a[onclick*="eCaseUnifiedFilesShowAll"]').click();

	$('div.eFilesWidgetFileNameContainer > a').each(function(index) {
		var fileID = $(this).attr("href").match(/javascript:srcUp\('%2F([^%]+)%3F[^']+'\);/)[1];
		var directFileURL = $('a[onclick*="'+fileID+'"]:contains("Download")').attr("onclick").match(/entityFilesComponent\.performAction\(\'[^']+\', \'[^']+\', \'[^']+\', \'([^']+)\'/)[1];
		$(this).attr("href", directFileURL);
		$(this).tooltip({content: '<img src="'+directFileURL+'" />'});
	});
}
