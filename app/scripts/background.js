'use strict';

/* begin automatically added by generator */
// chrome.runtime.onInstalled.addListener(function (details) {
//   console.log('xxxpreviousVersion', details.previousVersion);
// });

// chrome.tabs.onUpdated.addListener(function (tabId) {
//   chrome.pageAction.show(tabId);
// });

/* end automatically added by generator */

console.log('Hello from background!');

var lastSeenUrl;

chrome.webRequest.onCompleted.addListener(
    function(details) {
        var currentUrl = details.url;
        var tabId = details.tabId;

        //don't send the message if for some reason there's no active tab
        //or if the url is the same as the last url we examined 
        //(the second case will happen when this request is us re-loading the data).
        if (tabId !== -1 && lastSeenUrl !== currentUrl) {
            //TODO: only dispatch requests for weight, not calories.

            //console.log('Saw request for ' + currentUrl);

            chrome.tabs.sendMessage(tabId, { url: currentUrl });
        }
        
    },
    { urls: ['*://*.myfitnesspal.com/*/*.json*'] }
);

//console.log('got here!');