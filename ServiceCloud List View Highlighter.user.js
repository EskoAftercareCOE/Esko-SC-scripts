// ==UserScript==
// @name        ServiceCloud List View Highlighter
// @author      bevi@esko.com
// @namespace   com.esko.bevi.schighlighter
// @description Highlights some logs depending on the time left to match RT
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20List%20View%20Highlighter.user.js
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @version     13
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_addStyle
// ==/UserScript==

// do we use "fancy" tooltips with jQuery UI (true / false) will be added to config later
var usejQueryUI = false;

// let's avoid conflicts with (potential) page-instanciated jQuery
this.$ = this.jQuery = jQuery.noConflict(true);

if (usejQueryUI) {
	// let's add jQuery UI's CSS (for the tooltips)
	jQuery("head").append ('<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/redmond/jquery-ui.min.css" rel="stylesheet" type="text/css">');
}

// a variable that will store the column specific class for 'Action Required' (we cheat a bit and set it to the most common occurence)
var actReqColClass = 'x-grid3-hd-00ND0000006DaqB';

// a variable that will store the column specific class for 'Contract Status' (we cheat a bit and set it to the most common occurence)
var contStatusColClass = 'x-grid3-hd-00ND0000006DaqT';



// each time an new DOM Node is added by SC ...
document.addEventListener('DOMNodeInserted', function () {

	// what time is it?
	var dateNow = Date.now();

	// extract the classes of the Action Required column
	var actReqColClasses = jQuery('div[title="Action Required"]').attr('class').split(/\s+/);
	//loop through the classes
	for (var i = 0; i < actReqColClasses.length; i++) {
		//search for a class mathing our pattern
		var actReqColMacthedClass = actReqColClasses[i].match(/^x-grid[0-9]+-hd-([A-Za-z0-9]{13,16})$/);
		if (actReqColMacthedClass !== null) {
			//if we have a match we store the class name and break the loop
			actReqColClass = actReqColMacthedClass[1];
			break;
		}
	}

	// extract the classes of the Contract Status column
	var contStatusClasses = jQuery('div[title="Contract Status"]').attr('class').split(/\s+/);
	// loop through the classes
	for (var j = 0; j < contStatusClasses.length; i++) {
		//search for a class mathing our pattern
		var contStatusMacthedClass = contStatusClasses[i].match(/^x-grid[0-9]+-hd-([A-Za-z0-9]{13,16})$/);
		if (contStatusMacthedClass !== null) {
			//if we have a match we store the class name and break the loop
			contStatusColClass = contStatusMacthedClass[1];
			break;
		}
	}

	// for each "line" of the result page we will do a few things...
	jQuery('.x-grid3-row-table').each(function(index) {

		// we'll use that later to store the tooltip text
		var toolTip;

		// first we reset the styles
		jQuery(this).css('background-color', '');

		// let's fetch and store this log's creation date (regex powaaaa)
		var dateOpenData = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) ([0-9]{1,2}):([0-9]{2})(\s?PM|\s?AM)?$/g.exec(jQuery(this).find('.x-grid3-td-CASES_CREATED_DATE').text());

		// now let's make a proper date object from what our regex extracted
		var dateOpenObj;

		// new check for US style dates
		if (dateOpenData[6].trim() == 'PM') {
			// PM => hours + 12 & switch month & day
			dateOpenObj  = new Date(dateOpenData[3],dateOpenData[1]-1,dateOpenData[2],dateOpenData[4]+12,dateOpenData[5]);
		} else if (dateOpenData[6].trim() == 'AM') {
			// AM => switch month & day
			dateOpenObj  = new Date(dateOpenData[3],dateOpenData[1]-1,dateOpenData[2],dateOpenData[4],dateOpenData[5]);
		} else {
			// European-style date => let's use it like this
			dateOpenObj  = new Date(dateOpenData[3],dateOpenData[2]-1,dateOpenData[1],dateOpenData[4],dateOpenData[5]);
		}

		// and now let's get how many minutes have elapsed since the log was opened
		var dateDifference = Math.round((dateNow-dateOpenObj)/(1000*60));

		// if the case isn't on Call
		if ((jQuery(this).find('.x-grid3-col-'+contStatusColClass).text() != 'CA')) {

			// let's add a tooltip to the table that shows how long the log was open
			if (Math.round(60-dateDifference) > 0) {
				toolTip = 'This log has been opened for ' + dateDifference + ' minutes, ' + Math.round(60-dateDifference) + ' minutes left!';
			} else {
				toolTip = 'This log has been opened for ' + dateDifference + ' minutes, ' + Math.round(dateDifference-60) + ' minutes late!';
			}

			jQuery(this).attr('title', toolTip);
			if (usejQueryUI) {
				jQuery(this).tooltip({show:{effect:'fade'}, hide:{effect:'fade'}, track:true});
			}

			// let's color the lines
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

		} else {
			// the case is "On call" let's use a proper highliting scheme
			// here we count in days, not minutes, let's convert
			var dateDifferenceDays = Math.round(dateDifference/(60*24));
			// let's add a tooltip to the table that shows how long the log was open
			if (Math.round(7-dateDifferenceDays) > 0) {
				toolTip = 'This log has been opened for ' + dateDifferenceDays + ' days, ' + Math.round(7-dateDifferenceDays) + ' days left!';
			} else {
				toolTip = 'This log has been opened for ' + dateDifferenceDays + ' days, ' + Math.round(dateDifferenceDays-7) + ' days late!';
			}
			jQuery(this).attr('title', toolTip);
			if (usejQueryUI) {
				jQuery(this).tooltip({show:{effect:'fade'}, hide:{effect:'fade'}, track:true});
			}

			// let's color the lines
			if (dateDifferenceDays > 7 ) {
				// if the log is older than 7 days => black background
				jQuery(this).css('background-color', 'rgba(0, 0, 0, 0.33)');

			} else if (dateDifferenceDays > 2 ) {
				// if the log is older than 2 days => blue background
				jQuery(this).css('background-color', 'rgba(0, 0, 255, 0.33)');
			}
		}

		// let's check if some cases are pending (finance, quote, sinterklaas...)
		if ((jQuery(this).find('.x-grid3-col-CASES_STATUS').text().lastIndexOf('Pending', 0) === 0)) {
			// but only if action required isn't checked
			if ((jQuery(this).find('.x-grid3-col-'+actReqColClass).find('.checkImg').attr('alt') == 'Not Checked')) {
				// let's lighten those lines
				jQuery(this).css('opacity', '0.33');
			}
		}
	});
}, false);



