// ==UserScript==
// @name        ServiceCloud Email Signature
// @namespace   com.esko.bevi.scesig
// @description Adds a Signature at the bottom of a ServiceCloud reply
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Email%20Signature.user.js
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

document.addEventListener("DOMNodeInserted", function () {
  jQuery(".cke_wysiwyg_frame").contents().replace("--------------- Original Message ---------------", "Yeepeee<br />--------------- Original Message ---------------");
},
                          false);
