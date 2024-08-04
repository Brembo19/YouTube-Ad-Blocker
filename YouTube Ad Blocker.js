// ==UserScript==
// @name         YouTube Ad Blocker Brembo
// @namespace    YouTube Ad Blocker Brembo
// @version      1.0
// @description  Block YouTube ads discord.gg/m8r8Q37g4z
// @author       Brembo
// @match        *://*.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove ads from the video player
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

    // Observe changes in the DOM
    observer.observe(document.body, { childList: true, subtree: true });

    // Skip ads
    function skipAds() {
        var skipButton = document.querySelector('.ytp-ad-skip-button');
        if (skipButton) {
            skipButton.click();
        }
    }

    // Check for ads every 500ms
    setInterval(skipAds, 500);

    // Remove sidebar ads
    function removeSidebarAds() {
        var adContainers = document.querySelectorAll('#secondary #player-ads, #secondary ytd-promoted-sparkles-web-renderer');
        adContainers.forEach(function(ad) {
            ad.remove();
        });
    }

    // Check for sidebar ads every 1000ms
    setInterval(removeSidebarAds, 1000);
})();
