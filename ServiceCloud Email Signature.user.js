// ==UserScript==
// @name        ServiceCloud Email Signature
// @namespace   com.esko.bevi.scesig
// @author      bevi@esko.com
// @description Adds a Signature at the bottom of a ServiceCloud reply
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Email%20Signature.user.js
// @include     https://esko.my.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     3
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

document.addEventListener("DOMNodeInserted", function () {
  jQuery(".cke_wysiwyg_frame").contents().replace("--------------- Original Message ---------------", "Yeepeee<br />--------------- Original Message ---------------");
},
                          false);
