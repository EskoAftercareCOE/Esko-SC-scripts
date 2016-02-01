![esko](https://www.esko.com/design/esko/img/logo-esko-new.png "Esko") Service Cloud scripts
====== 
## A few userscripts  to workaround ServiceCloud's annoyances in Esko's support environment ##

These scripts will be useful for anyone at esko being annoyed by ServiceCloud's limitations (_at least that's the hope_).

The scripts are what is called "userscripts". This is a specfic type of JavaScript, meant to be exectuted via a browser extension and that can interact with and/or modify web pages.

### A word of caution
There is no warranty for the program, to the extent permitted by applicable law. Except when otherwise stated in writing the copyright holders and/or other parties provide the program “as is” without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The entire risk as to the quality and performance of the program is with you. Should the program prove defective, you assume the cost of all necessary servicing, repair or correction.


### Pre-requisites
Their use is recommended via these extensions:
+ TamperMonkey :thumbsup: (Chrome, Safari, Opera) see http://tampermonkey.net/
+ Greasemonkey :thumbsup: (Firefox) see https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
+ NinjaKit (Chrome, Opera) see https://github.com/os0x/NinjaKit

### Installation
In theory, modern extensions should detect the script as userscript if you click on the install links (:floppy_disk:) on this page and offer to install the script.

On the other hand, the view source link (:page_with_curl:) will take you to the beautified source code.

### Issues / Feature requests
Please use the [GitHub issue tracker](https://github.com/tuxfre/esko-SC-scripts/issues/new "GitHub issue tracker") and create a new issue.

***

###At the moment we have the following scripts:
+ ServiceCloud Refresh List [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Refresh List.user.js "Install the script") [:page_with_curl:](./ServiceCloud Refresh List.user.js "See the source")
  ------

 | **description** | refreshes any list view every 30 sec (configurable via a small edit in the script) |
 | ---: | --- |
 | **status** | :heavy_check_mark: _(working fine)_ |
 | **todo**|  add a GUI for config |


+ ServiceCloud Local Links [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Local Links.user.js "Install the script") [:page_with_curl:](./ServiceCloud Local Links.user.js "See the source")
  ------
 | **description** | changes jobfolder links to direct system links (file:// or smb://) |
 | ---: | --- |
 | **status** | :heavy_check_mark: _(working fine)_ |
 | **todo**|  more testing |


+ ServiceCloud Multi Downloader [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Multi Downloader.user.js "Install the script") [:page_with_curl:](./ServiceCloud Multi Downloader.user.js "See the source")
  ------
 | **description** | allows for downloading all of the of attachements from an email view in one click |
 | ---: | --- |
 | **status** | :wavy_dash: _**(work in progress, may be unstable)**_ • At the moment, this works only with Chrome, Safari will open tabs and Firefox won't do a thing |
 | **todo**|  support for other browsers => if anyone has experience with GreaseMonkey's GM_download or with this polyfill https://gist.github.com/ccloli/832a8350b822f3ff5094 I'd be interested |


+ ServiceCloud Email Signature [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Email Signature.user.js "Install the scripts") [:page_with_curl:](./ServiceCloud Email Signature.user.js "See the source")
  ------
 | **description** | automatically adds a signature with image(s) in a mail composer field |
 | ---: | --- |
 | **status** | :heavy_multiplication_x: _**(work in progress, doesn't work at all)**_ |
 | **todo**|  make it work |

+ ServiceCloud Declutter close form [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Declutter close form.user.js "Install the scripts") [:page_with_curl:](./ServiceCloud Declutter close form.user.js "See the source")
  ------
 | **description** | Folds up some part of the form when closing a case to save screen estate |
 | ---: | --- |
 | **status** | :wavy_dash: _**(work in progress)**_ • At the moment, it can hide some objects on page, but it can't show them again if needed |
 | **todo**|  attch jQuery's toggle() to newly created DOM-objects |


***
  
  
  
This is a secret _ninja_ project brought to you by bevi@esko.com
