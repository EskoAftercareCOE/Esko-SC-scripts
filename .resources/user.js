// allow using local file links for SFDC
user_pref("capability.policy.policynames", "localfilelinks");
user_pref("capability.policy.localfilelinks.sites", "https://esko.my.salesforce.com/");
user_pref("capability.policy.localfilelinks.checkloaduri.enabled", "allAccess");
// enable asking for a specific handler for file:// links (windows explorer / mac os finder)
user_pref("network.protocol-handler.expose.file", false);
user_pref("network.protocol-handler.app.file", "C:\windows\explorer.exe");
user_pref("network.protocol-handler.external.file", true);
user_pref("network.protocol-handler.expose.smb", false);
user_pref("network.protocol-handler.app.smb", "/System/Library/CoreServices/Finder.app/Contents/MacOS/Finder");
user_pref("network.protocol-handler.external.smb", true);
