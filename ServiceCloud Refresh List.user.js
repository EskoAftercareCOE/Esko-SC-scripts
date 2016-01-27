// ==UserScript==
// @name        ServiceCloud Refresh List
// @author      bevi@esko.com
// @namespace   com.esko.bevi.screfresh
// @description Refreshes ServiceCloud list views
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Refresh%20List.user.js
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     4
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       none
// ==/UserScript==

var refreshDelay = 30; //refresh time in seconds

this.$ = this.jQuery = jQuery.noConflict(true);

function autorefresh() {
    jQuery(".refreshListButton").click();
    setTimeout(autorefresh, refreshDelay*1000);
}

autorefresh();
