var gerrard00 = gerrard00 || {};

gerrard00.MyFitnessPalDataScrubber = (function () {

    'use strict';

    function cleanRawData(rawData) {
        //strip data with 0 totals. mfp returns entries for the entire date ranage,
        //even if the user hasn't tracked anything for a particular date
        var cleanData  =
            rawData.filter(function(entry) {
                return entry.total > 0;
            })
            //the raw json file repeats readings for every day between readings
            .filter(function (entry, index, array) {
                    return (index === 0) ||
                        //TODO: we should only do this if the entry is one day before...punting for now to avoid date parsing
                        (entry.total !== array[index - 1].total);
                });

        //mfp omits the year from dates in this year, add it back.
        //TODO: add comments...make this a function?
        //we start out with one year in the future, our first entry will decrement it to the current year
        var currentYear = new Date().getFullYear();
        var lastSeenMonth = null;

        cleanData = cleanData.reverse();

        cleanData.forEach(function(entry) {
            var rawDate = entry.date;

            var currentEntryMonth = rawDate.split('/')[0];
         
            if (currentEntryMonth !== lastSeenMonth) {

                lastSeenMonth = currentEntryMonth;

                //we just crossed a year boundary
                if (currentEntryMonth === '12') {
                    currentYear--;
                }
            }

            var dateToUse = new Date(rawDate + '/' + currentYear);

            entry.date = dateToUse;
        });

        cleanData = cleanData.reverse();

        return cleanData;
    }

    return {
        cleanRawData : cleanRawData
    };
}());