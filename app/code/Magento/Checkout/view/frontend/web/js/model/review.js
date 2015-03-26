/**
 * {license_notice}
 *
 * @copyright   {copyright}
 * @license     {license_link}
 */
/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'ko',
        'mage/storage',
        '../model/quote',
        '../model/url-builder'

    ],
    function (ko, storage, quote, urlBuilder) {
        var totals = ko.observable();
        quote.getPaymentMethod().subscribe(function () {
            storage.get(
                urlBuilder.createUrl('/carts/:quoteId/totals', {quoteId: quote.getQuoteId()})
            ).success(
                function (data) {
                    totals(data);
                    quote.setTotals(data);
                }
            ).error(
                function (data) {
                    totals([]);
                    quote.setTotals([]);
                }
            )
        });
        return {
            getTotals: function () {
                return totals;
            }
        }
    }
);
