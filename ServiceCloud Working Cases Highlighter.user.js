// ==UserScript==
// @name        ServiceCloud Working Cases Highlighter
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scwc
// @description Highlights some logs depending on the date of last action
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Working%20Cases%20Highlighter.user.js
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @include     /^http(s)?:\/\/(esko--accept\.cs83\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @version     1
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_addStyle
// ==/UserScript==

// let's avoid conflicts with (potential) page-instanciated jQuery
this.$ = this.jQuery = jQuery.noConflict(true);

// each time an new DOM Node is added by SC ...
document.addEventListener('DOMNodeInserted', function () {

	// what time is it?
	var dateNow = Date.now();

	// for each "line" of the result page we will do a few things...
	jQuery('.x-grid3-row-table').each(function(index) {

		//if the case status is "Working"
		if ((jQuery(this).find('.x-grid3-col-CASES_STATUS').text().lastIndexOf('Working', 0) === 0) || (jQuery(this).find('.x-grid3-col-CASES_STATUS').text().lastIndexOf('Waiting', 0) === 0)) {

			// we'll use that to store infos on the style of time settings (EU or US)
			var hourStyle;

			// first we reset the styles
			jQuery(this).css('background-color', '');

			// let's fetch and store this log's creation date (regex powaaaa)
			var re = /(^([0-9]{4})-([0-9]|1[0-2])-([0-9]|[1-2][0-9]|3[0-1])\s(AM|PM)([0-9]|1[0-2]):([0-5][0-9])$)|(^([0-9]{4})\/(0[0-9]|1[0-2])\/(0[0-9]|[1-2][0-9]|3[0-1])\s(0[0-9]|[1][0-9]|2[0-4]):([0-5][0-9])$)|(^([0-9]|1[0-2])\/([0-9]|[1-2][0-9]|3[0-1])\/([0-9]{4})\s([0-9]|1[0-2]):([0-5][0-9])\s(PM|AM)$)|(^(0?[0-9]|[1-2][0-9]|3[0-1])[.\/\-](0[0-9]|1[0-2])[.\/\-]([0-9]{4})\s(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$)|(^(0[0-9]|[1-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/([0-9]{4})\s([0-9]|1[0-2]):([0-5][0-9])\s(PM|AM)$)/g; 
			var dateString = jQuery(this).find('.x-grid3-td-CASES_LAST_UPDATE').text();
			var dateOpenData = re.exec(dateString);

			// let's account for various date formats
			var year, month, day, hour, minute;
			if (dateOpenData) {
				// let's test the kind of date we captured
				if (typeof dateOpenData[1] !== 'undefined') {
					// dateOpenData[1] is defined => CN date
					year=   +dateOpenData[2];
					month=  +dateOpenData[4];
					day=    +dateOpenData[3];
					hour=   +dateOpenData[6];
					minute= +dateOpenData[7];
					if (dateOpenData[5] === 'PM' && hour !== 12) {
						hour += 12;
					}
				} else if (typeof dateOpenData[8] !== 'undefined') {
					// dateOpenData[8] is defined => JP date
					year=   +dateOpenData[9];
					month=  +dateOpenData[10];
					day=    +dateOpenData[11];
					hour=   +dateOpenData[12];
					minute= +dateOpenData[13];
				} else if (typeof dateOpenData[14] !== 'undefined') {
					// dateOpenData[14] is defined => US date
					year=   +dateOpenData[17];
					month=  +dateOpenData[15];
					day=    +dateOpenData[16];
					hour=   +dateOpenData[18];
					minute= +dateOpenData[19];
					if (dateOpenData[20] === 'PM' && hour !== 12) {
						hour += 12;
					}
				} else if (typeof dateOpenData[21] !== 'undefined') {
					// dateOpenData[21] is defined => NL, SG, UK, FR IT, BR, ES, DE, PT date
					year=   +dateOpenData[24];
					month=  +dateOpenData[23];
					day=    +dateOpenData[22];
					hour=   +dateOpenData[25];
					minute= +dateOpenData[26];
				} else if (typeof dateOpenData[27] !== 'undefined') {
					// dateOpenData[8] is defined => AU, IN, MX date
					year=   +dateOpenData[30];
					month=  +dateOpenData[29];
					day=    +dateOpenData[28];
					hour=   +dateOpenData[31];
					minute= +dateOpenData[32];
					if (dateOpenData[33] === 'PM' && hour !== 12) {
						hour += 12;
					}
				} else {
					throw new Error('Unrecognized date format!');
				}
			}

			// Let's make this a date
			var dateOpenObj  = new Date(year,month-1,day,hour,minute);

			// and now let's get how many minutes have elapsed since the log was opened
			var dateDifference = Math.round((dateNow-dateOpenObj)/(1000*60));
			jQuery(this).attr('title', dateDifference);

			/*
Case that has been acted on today - no color
Case that has not been acted on since yesterday - gray
Case that has not been acted on for two days - yellow
Case that has not been acted on longer than three days or longer - red
*/
			// let's color the lines
			if (dateDifference > 60*72 ) {
				// if last action happened more than 72h ago => red background
				jQuery(this).css('background-color', 'rgba(255, 0, 0, 0.33)');

			} else if (dateDifference > 60*48 ) {
				// if last action happened more than 48h ago => yellow background
				jQuery(this).css('background-color', 'rgba(255, 255, 0, 0.33)');

			} else if (dateDifference > 60*24 ) {
				// if last action happened more than 24h ago => grey background
				jQuery(this).css('background-color', 'rgba(128, 128, 128, 0.33)');
			}
		}
	});
}, false);
