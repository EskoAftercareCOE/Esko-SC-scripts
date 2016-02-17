// ==UserScript==
// @name        ServiceCloud List View Highlighter
// @author      bevi@esko.com
// @namespace   com.esko.bevi.schighlighter
// @description Highlights some logs depending on the time left to match RT
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20List%20View%20Highlighter.user.js
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @version     3
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_addStyle
// ==/UserScript==

// let's avoid conflicts with (potential) page-instanciated jQuery
this.$ = this.jQuery = jQuery.noConflict(true);

// let's add jQuery UI's CSS (for the tooltips)
jQuery("head").append ('<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/redmond/jquery-ui.min.css" rel="stylesheet" type="text/css">');

// what time is it?
var dateNow = Date.now();

// each time an new DOM Node is added by SC ...
document.addEventListener('DOMNodeInserted', function () {

	// for each "line" of the result page we will do a few things...
	jQuery('.x-grid3-row-table').each(function( index ) {

		// first we reset the styles
		jQuery(this).css('background-color', '');

		// let's fetch and store this log's creation date (regex powaaaa)
		var dateOpenData = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2})$$/g.exec(jQuery( this ).find('.x-grid3-td-CASES_CREATED_DATE').text());

		// now let's make a proper date object from what our regex extracted
		var dateOpenObj  = new Date(dateOpenData[3],dateOpenData[2]-1,dateOpenData[1],dateOpenData[4],dateOpenData[5]);

		// and now let's get how many minutes have elapsed since the log was opened
		var dateDifference = Math.round((dateNow-dateOpenObj)/(1000*60));

		// let's add a tooltip to the table that shows how long the log was open
		var toolTip;
		if (Math.round(60-dateDifference) > 0) {
			toolTip = 'This log has been opened for ' + dateDifference + ' minutes, ' + Math.round(60-dateDifference) + ' minutes left!';
		} else {
			toolTip = 'This log has been opened for ' + dateDifference + ' minutes, ' + Math.round(dateDifference-60) + ' minutes late!';
		}
		jQuery(this).attr('title', toolTip);
		jQuery(this).tooltip({ track: true });

		if (dateDifference > 60 ) {
			// if the log is older than one hour => black background
			jQuery(this).css('background-color', 'rgba(0, 0, 0, 0.33)');

		} else if (dateDifference > 50 ) {
			// if the log is older than 50 min => red background
			jQuery(this).css('background-color', 'rgba(255, 0, 0, 0.33)');

		} else if (dateDifference > 40 ) {
			// if the log is older than 40 min => red background
			jQuery(this).css('background-color', 'rgba(255, 128, 0, 0.33)');

		} else if (dateDifference > 30 ) {
			// if the log is older than 30 min => red background
			jQuery(this).css('background-color', 'rgba(0, 255, 0, 0.33)');
		}

		// let's check if some cases are pending (finance, quote, sinterklaas...)
		if (jQuery( this ).find('.x-grid3-col-CASES_STATUS').text().lastIndexOf('Pending', 0) === 0) {
			// let's lighten those lines
			jQuery(this).css('opacity', '0.33');
		}
	});
}, false);
