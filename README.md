![esko](https://www.esko.com/design/esko/img/logo-esko-new.png "Esko") Service Cloud scripts
====== 
## Scripts used to workaround SC's annoyances in esko's support environment ##

These scripts will be useful for anyone at esko being annoyed by SC's limitations

The scripts are what is called "userscripts". This is a specfic type of JavaScript, meant to be exectuted via a browser extension and that can interact and modify web pages.

They are meant to be used with
+ TamperMonkey (Chrome, Safari, Opera) see http://tampermonkey.net/
+ Greasemonkey (Firefox) see https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/

In theory, modern extensions should detect the script as userscript if you click on the links on this page (for example [ServiceCloud Refresh List](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Refresh%20List.user.js)) and offer to install the script.


At the moment we have the following scripts:
+ [ServiceCloud Refresh List](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Refresh List.user.js)
  ------

  refreshes any list view every 30 sec (configurable)
  
  :heavy_check_mark: _(working fine)_

+ [ServiceCloud Local Links](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Local Links.user.js)
  ------

  changes jobfolder links to direct system links (file:// or smb://)
  
  :heavy_check_mark: _(working fine)_

+ [ServiceCloud Multi Downloader](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Multi Downloader.user.js)
  ------

  allows for downloading of attachements from an email view
  
  :wavy_dash: _**(work in progress, may be unstable)**_

+ [ServiceCloud Email Signature](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Email Signature.user.js)
  ------

  automatically adds a signature in a mail composer
  
  :heavy_multiplication_x: _**(work in progress, doesn't work at all)**_

