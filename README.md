![esko](https://www.esko.com/design/esko/img/logo-esko-new.png "Esko") Service Cloud scripts
====== 
## A few userscripts  to workaround ServiceCloud's annoyances in Esko's support environment ##

These scripts will be useful for anyone at esko being annoyed by SC's limitations

The scripts are what is called "userscripts". This is a specfic type of JavaScript, meant to be exectuted via a browser extension and that can interact and modify web pages.

They are meant to be used with:
+ TamperMonkey (Chrome, Safari, Opera) see http://tampermonkey.net/
+ Greasemonkey (Firefox) see https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/

In theory, modern extensions should detect the script as userscript if you click on the install links (:floppy_disk:) on this page and offer to install the script. On the other hand, the view link (:page_with_curl:) will bring you to the beautified source code.

***

###At the moment we have the following scripts:
+ ServiceCloud Refresh List [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Refresh List.user.js "Install the script") [:page_with_curl:](./ServiceCloud Refresh List.user.js "See the source")
  ------

  refreshes any list view every 30 sec (configurable)
  
  :heavy_check_mark: _(working fine)_

+ ServiceCloud Local Links [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Local Links.user.js "Install the script") [:page_with_curl:](./ServiceCloud Local Links.user.js "See the source")
  ------

  changes jobfolder links to direct system links (file:// or smb://)
  
  :heavy_check_mark: _(working fine)_

+ ServiceCloud Multi Downloader [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Multi Downloader.user.js "Install the script") [:page_with_curl:](./ServiceCloud Multi Downloader.user.js "See the source")
  ------

  allows for downloading of attachements from an email view
  
  :wavy_dash: _**(work in progress, may be unstable)**_

+ ServiceCloud Email Signature [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Email Signature.user.js "Install the scripts") [:page_with_curl:](./ServiceCloud Email Signature.user.js "See the source")
  ------

  automatically adds a signature in a mail composer
  
  :heavy_multiplication_x: _**(work in progress, doesn't work at all)**_

***
