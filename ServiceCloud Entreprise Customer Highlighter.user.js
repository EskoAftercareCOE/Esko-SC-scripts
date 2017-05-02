// ==UserScript==
// @name        ServiceCloud Entreprise Customer Highlighter
// @author      bevi@esko.com
// @namespace   com.esko.bevi.entreprisehighlighter
// @description Highlights some logs depending on the Entreprise Customer status
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Entreprise%20Customer%20Highlighter.user.js
// @version     1
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_addStyle
// ==/UserScript==

// let's avoid conflicts with (potential) page-instanciated jQuery
this.$ = this.jQuery = jQuery.noConflict(true);

jQuery('<style type="text/css"> @-webkit-keyframes blink { 50% { border-color: #ff0000; }  }  @keyframes blink { 50% { border-color: #ff0000; }  }</style>').appendTo($('head'));

// a variable that will store the column specific class for 'Enterprise customer' (we cheat a bit and set it to the most common occurence)
var entCustColClass = 'x-grid3-hd-00ND0000006Daqa';


// each time an new DOM Node is added by SC ...
document.addEventListener('DOMNodeInserted', function () {

	// extract the classes of the Purpose Code column
	var entCustColClassesObject = jQuery('div[title="Enterprise customer"]').attr('class');
	var entCustColClasses = typeof entCustColClassesObject !== 'undefined' ? entCustColClassesObject.split(/\s+/) : ({});

	//loop through the classes
	for (var i = 0; i < entCustColClasses.length; i++) {
		//search for a class mathing our pattern
		var entCustColMacthedClass = entCustColClasses[i].match(/^x-grid[0-9]+-hd-([A-Za-z0-9]{13,16})$/);
		if (entCustColMacthedClass !== null) {
			//if we have a match we store the class name and break the loop
			entCustColClass = entCustColMacthedClass[1];
			break;
		}
	}
	// for each "line" of the result page we will do a few things...
	jQuery('.x-grid3-row-table').each(function(index) {
		//if the case status is "New"
		if ((jQuery(this).find('.x-grid3-col-CASES_STATUS').text().lastIndexOf('New', 0) === 0)) {
			// first we reset the styles
			jQuery(this).css({"border-color":"", "border-width":"", "border-style":""});

			// if the Enterprise customer box is toggled
			if (jQuery(this).find('.x-grid3-col-'+entCustColClass).children("img.checkImg").attr('src') != "/img/checkbox_unchecked.gif") {
				jQuery(this).css({"border-color":"orange", "border-width":"5px", "border-style":"solid", "animation": "blink .5s step-end infinite alternate", "-webkit-animation": "blink .5s step-end infinite alternate"});
			}
		}
	});
}, false);
