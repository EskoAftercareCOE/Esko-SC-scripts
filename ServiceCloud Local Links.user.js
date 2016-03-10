// ==UserScript==
// @name        ServiceCloud Local Links
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scloclinks
// @description Changes links to jobfolders to local links
// @downloadURL https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Local%20Links.user.js
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     6
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==

var folderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAe0lEQVR4Ae3VMQ7CMBBE0X+a4GNyIKSQHCxExCUw1BZGFN5t0Pzp/SQ3i3Ou6cSVO/qyM4NN3FC7WOKCUCaxoVzigUJWWSl0eqKw7ZRcQCzZwJEN6B+BlwEDw4AMGPg9AwZq9tFfQ4GZjwo7CtrGBD1i4Qj4nLl93jn3BjR5layvzA8cAAAAAElFTkSuQmCC';

this.$ = this.jQuery = jQuery.noConflict(true);

waitForKeyElements ("a[title='Job Folder Mac']", links);

function links() {
	jQuery("a[title^='Job Folder']").parent().css( "background-color", "rgba(255,255,0,0.5)" );
	var caseID = jQuery(document).find("title").text().match(/^Case: ([0-9]{8}).*$/);
	var jobFolderBasePath = 'esko-graphics.com/globalstorage/CC-SW-Problemlog-Gent/' + caseID[1].slice(0, -3) + '000-' + caseID[1].slice(0, -3) + '999/' + caseID[1] + '/';
	jQuery("a[title='Job Folder Windows']").attr('href', 'file://///' + jobFolderBasePath);
	jQuery("a[title='Job Folder Windows']").prepend('<img src="'+ folderIcon +'" style="margin-right: 0.5em; height: 1em; width: 1em; vertical-align: baseline;">');
	jQuery("a[title='Job Folder Mac']").attr('href', 'smb://' + jobFolderBasePath);
	jQuery("a[title='Job Folder Mac']").prepend('<img src="'+ folderIcon +'" style="margin-right: 0.5em; height: 1em; width: 1em; vertical-align: baseline;">');
}
