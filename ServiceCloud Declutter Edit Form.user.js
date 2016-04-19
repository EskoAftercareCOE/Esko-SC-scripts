// ==UserScript==
// @name        ServiceCloud Declutter Edit form
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scdeclutt.edit
// @description Hide some panels from ServiceCloud's case editing form
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Declutter%20Edit%20Form.user.js
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([^\/]+)\/e\?(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @version     7
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var targets = {
	'New' :                         ['#head_3_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_10_ep', '#head_11_ep', '#head_12_ep'],
	'Working' :                     ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_11_ep', '#head_12_ep'],
	'Pending Finance Approval' :    ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_8_ep', '#head_9_ep', '#head_10_ep', '#head_12_ep'],
	'Pending Quotation' :           ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_8_ep', '#head_9_ep', '#head_10_ep', '#head_12_ep'],
	'Waiting - Customer' :          ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_10_ep', '#head_11_ep', '#head_12_ep'],
	'Sent to License' :             ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_9_ep', '#head_10_ep', '#head_11_ep', '#head_12_ep'],
	'Sent to R&D' :                 ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_10_ep', '#head_11_ep', '#head_12_ep'],
	'Sent to OEM' :                 ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_10_ep', '#head_11_ep', '#head_12_ep'],
	'Intervention' :                ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_11_ep', '#head_12_ep'],
	'Close to confirm' :            ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_11_ep', '#head_12_ep'],
	'Closed' :                      ['#head_2_ep', '#head_3_ep', '#head_4_ep', '#head_5_ep', '#head_6_ep', '#head_7_ep', '#head_8_ep', '#head_9_ep', '#head_11_ep', '#head_12_ep']
};

// Just in case, we check if the page is an edit page before starting the machine
if (/^Case Edit\: ([0-9]{8}) ~ Salesforce - Unlimited Edition$/i.test(jQuery(document).attr('title'))) {
	// If this is an edit page, then we wait for the last cancel button to be instanciated in the DOM and we start doing stuff
	waitForKeyElements ("input[name='cancel']:last", init);
}

// Our init routine
function init() {
	// Add a listener to the 'Status' drop-down
	jQuery('select#cas7').change(function() {
		fold(targets[jQuery('select#cas7 option:selected').text()]);
	});
	// We add the fold/unfold link to each section header
	jQuery("div[id^='head_'] > h3").each(function(indexS, valueS) {
		jQuery(valueS).parent().next().attr('id', jQuery(valueS).parent().attr('id')+"_contents");
		jQuery(valueS).prepend("<b><a herf=\"#\" id=\""+jQuery(valueS).parent().attr('id')+"_toggle\" onClick=\"if (document.getElementById('"+jQuery(valueS).parent().attr('id')+"_contents"+"').style.display == 'none'){ document.getElementById('"+jQuery(valueS).parent().attr('id')+"_contents"+"').style.display = ''; this.innerHTML ='[-]';} else { document.getElementById('"+jQuery(valueS).parent().attr('id')+"_contents"+"').style.display = 'none';  this.innerHTML ='[+]';}\" style=\"margin-right: 1em;\">[+]</a></b>");
	});
	// We fold the sections based on the currently selected status
	fold(targets[jQuery('select#cas7 option:selected').text()]);
}

// where the magic happens
function fold(what) {
	// First we unfold everything
	jQuery("div[id^='head_'] > h3").each(function(indexU, valueU) {
		jQuery(valueU).parent().next().show();
		jQuery(valueU).find("a[id$='_toggle']").text('[-]');
	});
	// Then we fold all the sections passed in the argument "what"
	jQuery.each(what, function(indexF, valueF) {
		jQuery(valueF).next().hide();
		jQuery(valueF).find("a[id$='_toggle']").text('[+]');

	});}
