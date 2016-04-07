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
// @version     10
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==

GM_config.init(
	{
		'id': 'scloclinksConfig', // The id used for this instance of GM_config
		'title': 'Local Links Global Configuration', // Panel Title
		'fields': // Fields object
		{
			'Server':
			{
				'label': 'Use the following server for job folders', // Appears next to field
				'type': 'select', // Makes this setting a dropdown
				'options': ['EMEA', 'NA/LA', 'APAC'], // Possible choices
				'default': 'EMEA' // Default value if user doesn't change it
			}
		}
	});

var Server = GM_config.get('Server');
var jobFolderRoot;

switch (Server) {
	case 'NA/LA':
		jobFolderRoot = 'CC-SW-Problemlog-NA/CC-SW-Problemlog-NA';
		break;
	case 'APAC':
		jobFolderRoot = 'CC-SW-Problemlog-ASP/CC-SW-Problemlog-ASP';
		break;
	default:
		// equivalent to EMEA
		jobFolderRoot = 'CC-SW-Problemlog-Gent/CC-SW-Problemlog-Gent';
}




var folderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAe0lEQVR4Ae3VMQ7CMBBE0X+a4GNyIKSQHCxExCUw1BZGFN5t0Pzp/SQ3i3Ou6cSVO/qyM4NN3FC7WOKCUCaxoVzigUJWWSl0eqKw7ZRcQCzZwJEN6B+BlwEDw4AMGPg9AwZq9tFfQ4GZjwo7CtrGBD1i4Qj4nLl93jn3BjR5layvzA8cAAAAAElFTkSuQmCC';

this.$ = this.jQuery = jQuery.noConflict(true);

waitForKeyElements ("a[title='Job Folder Mac']", links);

function links() {
//	jQuery("a[title^='Job Folder']").parent().css( "background-color", "rgba(255,255,0,0.5)" );
	jQuery("a[title^='Job Folder']").prepend('<img src="'+ folderIcon +'" style="margin-right: 0.5em; height: 1em; width: 1em; vertical-align: baseline;">');
	var caseID = jQuery(document).find("title").text().match(/^Case: ([0-9]{8}).*$/);
	var jobFolderBasePath = jobFolderRoot + '/' + caseID[1].slice(0, -3) + '000-' + caseID[1].slice(0, -3) + '999/' + caseID[1] + '/';
	jQuery("a[title='Job Folder Windows']").attr('href', 'file://///' + jobFolderBasePath);
	jQuery("a[title='Job Folder Mac']").attr('href', 'smb://' + jobFolderBasePath);
	jQuery("a[title^='Job Folder']").parent().first().append("<span style=\"float: right;\"><a href=\"#\" id=\"scloclinksConfigIcon\"><img alt=\"Configure Local Links\" title=\"Configure Local Links\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAICaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpggtEZAAACA0lEQVQ4EWP8DwQMVARMVDQLbNTgN5CFGC+vOv2C4cvPPwymigIMutI8eLXgNPDWy28M0gLsDMxMjAwzDz4GG/L+2x+wgdeefWGQF+Fk4GZjxjAcq4EHb71naNl8h0Gcj51BXYIbrunYnfcMf//9Z9h15Q2DlhQPQ2eoOgMnK2o0oPKgWndeec0A1Mfw/ONPhgM338EN/AB04U6gYaB0dhXoytsvv8LlYAysBha5KcLkwTQXGxOKS0GCjhpCDHoyvCjqQBxG9IS99MRzBlAYnbj3AazYQJaXoSVIDey1K0+/MOQvvw4WF+BiYXDVEmGwVRNk0AZ6HwYwwnDekScwOTAdYCQODycdYAyDXHXpyWcGkPdXn3kBDlNkAzG8zM6CKnT/9Xe4BX+AAfv43Q84H8RgZWZE4WN4GRQZN198ZchZeg2skIedmSHCXJJBXZybYeOFVwxHbr8HixvL8zGUeigyiPCyMSAbieFlYLJjePX5F9zWLz//Msw5hBoMIMlnH34ycALTIbJhIHFU/4FEgODAjbcQBh4SlKRuPMdMNhguBJlR7qnE8P3XHQZDoLdAEZG3DBKzoAgpAXqzf9cDcLIxUeDDsBIjDNFVgBKxz8SzDD9+/2OItpBkSLKRQVeCwidoIEj1rz//Gf4Cy2FQCgCFMT5AlIH4DECXwxop6IpI4QMALrGua1Hvj10AAAAASUVORK5CYII=\"></a></span>");
	jQuery('#scloclinksConfigIcon').click(function(){GM_config.open();});

}
