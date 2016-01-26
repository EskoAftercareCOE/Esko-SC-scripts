// ==UserScript==
// @name        ServiceCloud Refresh List
// @namespace   com.esko.bevi.screfresh
// @description Refreshes ServiceCloud list views
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     3
// @grant       none
// ==/UserScript==

var refreshDelay = 30; //refresh time in seconds

this.$ = this.jQuery = jQuery.noConflict(true);

function autorefresh() {
    jQuery(".refreshListButton").click();
    setTimeout(autorefresh, refreshDelay*1000);
}

autorefresh();
