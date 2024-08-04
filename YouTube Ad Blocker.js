// ==UserScript==
// @name         YouTube Ad Blocker Brembo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Block YouTube ads discord.gg/m8r8Q37g4z
// @author       Brembo
// @match        *://*.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    
    var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type === 'childList') {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var node = mutation.addedNodes[j];
                    if (node.tagName === 'YTD-PLAYER-AD-OVERLAY-RENDERER' || node.tagName === 'YTD-COMPANION-AD-RENDERER') {
                        node.remove();
                    }
                }
            }
        }
    });


    observer.observe(document.body, { childList: true, subtree: true });

   
    function skipAds() {
        var skipButton = document.querySelector('.ytp-ad-skip-button');
        if (skipButton) {
            skipButton.click();
        }
    }


    setInterval(skipAds, 500);


    function removeSidebarAds() {
        var adContainers = document.querySelectorAll('#secondary #player-ads, #secondary ytd-promoted-sparkles-web-renderer');
        adContainers.forEach(function(ad) {
            ad.remove();
        });
    }


    setInterval(removeSidebarAds, 1000);
})();
