/*
 * @author     Sashas IT Support <support@sashas.org>
 * @copyright  2018  Sashas IT Support Inc. (http://www.extensions.sashas.org)
 * @license     http://opensource.org/licenses/GPL-3.0  GNU General Public License, version 3 (GPL-3.0)
 */
/* jscs:disable */
/* eslint-disable */
define([
    'jquery',
    'mage/cookies'
], function ($) {
    'use strict';

    /**
     * @param {Object} config
     */
    return function (config) {
        var allowServices = false,
            allowedCookies,
            allowedWebsites;

        if (config.isCookieRestrictionModeEnabled) {
            allowedCookies = $.mage.cookies.get(config.cookieName);

            if (allowedCookies !== null) {
                allowedWebsites = JSON.parse(allowedCookies);

                if (allowedWebsites[config.currentWebsite] === 1) {
                    allowServices = true;
                }
            }
        } else {
            allowServices = true;
        }

        if (allowServices) {
            (function (i, s, o, g, r, a, m) {
                i.GoogleAnalyticsObject = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            // Process page info
            ga('create', config.pageTrackingData.accountId, 'auto');

            if (config.pageTrackingData.isAnonymizedIpActive) {
                ga('set', 'anonymizeIp', true);
            }

            // Process orders data
            /* Issue# 14951*/
            if (config.ordersTrackingData.hasOwnProperty('currency')) {
                ga('require', 'ec', 'ec.js');

                //Set currency code
                ga('set', 'currencyCode', config.ordersTrackingData.currency);

                // Collect product data for GA
                if (config.ordersTrackingData.products) {
                    $.each(config.ordersTrackingData.products, function (index, value) {
                        ga('ec:addProduct', value);
                    });
                }

                // Collect orders data for GA
                if (config.ordersTrackingData.orders) {
                    $.each(config.ordersTrackingData.orders, function (index, value) {
                        ga('ec:setAction', 'purchase', value);
                    });
                }

                ga('send', 'pageview');
            }else{
                // Process Data if not orders
                ga('send', 'pageview' + config.pageTrackingData.optPageUrl);
            }
        }
    }
});
