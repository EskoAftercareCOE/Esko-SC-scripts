//activate localfile links for SFDC
user_pref("capability.policy.policynames", "localfilelinks");
user_pref("capability.policy.localfilelinks.sites", "https://esko.my.salesforce.com/");
user_pref("capability.policy.localfilelinks.checkloaduri.enabled", "allAccess");
//enable using windows explorer / mac os finder to handle file:// links
user_pref("network.protocol-handler.expose.file", false);
user_pref("network.protocol-handler.external.file", true);
