var gerrard00 = gerrard00 || {};

gerrard00.MyFitnessPalDataScrubber = (function () {

    'use strict';

    function cleanRawData(rawData) {

      //we don't know if the dates are US or Euro style.
      //for now, use this helper. pass the last entries date (which we assume is today)
      //and today's date. This will go bang if the current date is ever not the last
      //date in our result set. Note that we do this before stripping repeated data
      //from the list, because we need to have today's reading to determine which
      //helper to use

        var datePartsHelper = gerrard00.DatePartsHelperFactory.
          getDatePartsHelper(rawData[rawData.length - 1].date, new Date());

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
            //use our helper to get the correct date parts
            var rawDateParts = datePartsHelper(entry.date);

            var currentEntryMonth = rawDateParts.month;

            if (currentEntryMonth !== lastSeenMonth) {

                lastSeenMonth = currentEntryMonth;

                //we just crossed a year boundary (note javascript month 11 is December)
                if (currentEntryMonth === 11) {
                    currentYear--;
                }
            }

            var dateToUse = new Date(currentYear, rawDateParts.month, rawDateParts.day);

            entry.date = dateToUse;
        });

        cleanData = cleanData.reverse();

        return cleanData;
    }

    return {
        cleanRawData : cleanRawData
    };
}());
