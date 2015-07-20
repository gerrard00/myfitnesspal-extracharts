var gerrard00 = gerrard00 || {};

gerrard00.DatePartsHelperFactory = (function () {

    function getDateParts(monthIndex, dayIndex, rawDate) {
        var datePieces = rawDate.split('/');

        //javascript months are zero indexed, so we have to subtract 1
        //from the raw input
        return {
            day: parseInt(datePieces[dayIndex]),
            month: parseInt(datePieces[monthIndex]) - 1
        };
    }

    function getDatePartsHelper(sampleRawDate, expectedDateForSample) {
        var sampleRawDateParts;
        var calculatedDate;

        //First try US style. December 1st is 12/1.
        try {
            //get the date parts US style
            sampleRawDateParts = getDateParts(0, 1, sampleRawDate);

            //if the dates match, we have a US style date.
            if (sampleRawDateParts.month === (expectedDateForSample.getMonth())
                && sampleRawDateParts.day === expectedDateForSample.getDate()) {
                
                console.log('Using US style date helper.')
                return getDateParts.bind(this, 0, 1);
            }
        }
        catch (_) {
            //ignore
        }

        //if we got here, it was not a US style date. For now,
        //assume that it is the more European style where 
        //December 1st is 1/12.
        console.log('Using Euro style date helper.')
        return getDateParts.bind(this, 1, 0);
    }

    return {
        getDatePartsHelper: getDatePartsHelper
    }
}());