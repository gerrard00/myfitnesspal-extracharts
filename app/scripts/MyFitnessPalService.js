var gerrard00 = gerrard00 || {};

gerrard00.MyFitnessPalService = (function () {

    'use strict';

    /* global $, gerrard00 */

    //TODO: accept a callback
    function getWeightData( sourceUrl, dataReceiver, errorReceiver ) {

        console.log('source url: ' + sourceUrl);

        $.ajax(sourceUrl)
          .done(function(response) {
            console.log('mfp -> success');

            var cleanData = gerrard00.MyFitnessPalDataScrubber.cleanRawData(response.data);

            dataReceiver({ label: response.label, data: cleanData });
        })
        .fail(function( jqXHR, textStatus) {
            console.log('mfp -> error');
            errorReceiver('Error talking to MyFitnessPal: ' + textStatus);
        })
        .always(function() {
            console.log('mfp -> complete');
        });

        //fake data
        //dataReceiver(cleanRawData(fakeWeightData.data));
    }

    return {
        getWeightData : getWeightData
    };
}());