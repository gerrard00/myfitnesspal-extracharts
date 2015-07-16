var gerrard00 = gerrard00 || {};

gerrard00.MyFitnessPalService = (function () {

    'use strict';

    /* global $ */

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

    //TODO: accept a callback
    function getWeightData( sourceUrl, dataReceiver, errorReceiver ) {

        console.log('source url: ' + sourceUrl);

        $.ajax(sourceUrl)
          .done(function(response) {
            console.log('mfp -> success');

            var cleanData = cleanRawData(response.data);

            dataReceiver(cleanData);
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

//TODO: remove this fake data and inject real or fake service into content script
// var fakeWeightData = {'chartType': 'line',
//  'title': 'Weight',
//  'category': 'progress',
//  'label': 'Weight',
//  'data': [{'date':'7/15','total':0.0},{'date':'7/16','total':0.0},{'date':'7/17','total':0.0},{'date':'7/18','total':0.0},{'date':'7/19','total':0.0},{'date':'7/20','total':0.0},{'date':'7/21','total':0.0},{'date':'7/22','total':0.0},{'date':'7/23','total':0.0},{'date':'7/24','total':0.0},{'date':'7/25','total':0.0},{'date':'7/26','total':0.0},{'date':'7/27','total':0.0},{'date':'7/28','total':0.0},{'date':'7/29','total':0.0},{'date':'7/30','total':0.0},{'date':'7/31','total':0.0},{'date':'8/01','total':0.0},{'date':'8/02','total':0.0},{'date':'8/03','total':0.0},{'date':'8/04','total':0.0},{'date':'8/05','total':0.0},{'date':'8/06','total':0.0},{'date':'8/07','total':0.0},{'date':'8/08','total':0.0},{'date':'8/09','total':0.0},{'date':'8/10','total':0.0},{'date':'8/11','total':0.0},{'date':'8/12','total':0.0},{'date':'8/13','total':0.0},{'date':'8/14','total':0.0},{'date':'8/15','total':0.0},{'date':'8/16','total':0.0},{'date':'8/17','total':0.0},{'date':'8/18','total':0.0},{'date':'8/19','total':0.0},{'date':'8/20','total':0.0},{'date':'8/21','total':0.0},{'date':'8/22','total':0.0},{'date':'8/23','total':0.0},{'date':'8/24','total':0.0},{'date':'8/25','total':0.0},{'date':'8/26','total':0.0},{'date':'8/27','total':0.0},{'date':'8/28','total':0.0},{'date':'8/29','total':0.0},{'date':'8/30','total':0.0},{'date':'8/31','total':0.0},{'date':'9/01','total':0.0},{'date':'9/02','total':0.0},{'date':'9/03','total':0.0},{'date':'9/04','total':0.0},{'date':'9/05','total':0.0},{'date':'9/06','total':0.0},{'date':'9/07','total':0.0},{'date':'9/08','total':0.0},{'date':'9/09','total':0.0},{'date':'9/10','total':0.0},{'date':'9/11','total':0.0},{'date':'9/12','total':0.0},{'date':'9/13','total':0.0},{'date':'9/14','total':0.0},{'date':'9/15','total':0.0},{'date':'9/16','total':0.0},{'date':'9/17','total':0.0},{'date':'9/18','total':0.0},{'date':'9/19','total':0.0},{'date':'9/20','total':0.0},{'date':'9/21','total':0.0},{'date':'9/22','total':0.0},{'date':'9/23','total':0.0},{'date':'9/24','total':0.0},{'date':'9/25','total':0.0},{'date':'9/26','total':0.0},{'date':'9/27','total':0.0},{'date':'9/28','total':0.0},{'date':'9/29','total':0.0},{'date':'9/30','total':0.0},{'date':'10/01','total':0.0},{'date':'10/02','total':0.0},{'date':'10/03','total':0.0},{'date':'10/04','total':0.0},{'date':'10/05','total':0.0},{'date':'10/06','total':0.0},{'date':'10/07','total':0.0},{'date':'10/08','total':0.0},{'date':'10/09','total':0.0},{'date':'10/10','total':0.0},{'date':'10/11','total':0.0},{'date':'10/12','total':0.0},{'date':'10/13','total':0.0},{'date':'10/14','total':0.0},{'date':'10/15','total':0.0},{'date':'10/16','total':0.0},{'date':'10/17','total':0.0},{'date':'10/18','total':0.0},{'date':'10/19','total':0.0},{'date':'10/20','total':0.0},{'date':'10/21','total':271.0},{'date':'10/22','total':271.0},{'date':'10/23','total':271.0},{'date':'10/24','total':271.0},{'date':'10/25','total':271.0},{'date':'10/26','total':271.0},{'date':'10/27','total':270.5},{'date':'10/28','total':270.5},{'date':'10/29','total':270.5},{'date':'10/30','total':270.5},{'date':'10/31','total':270.5},{'date':'11/01','total':270.5},{'date':'11/02','total':270.5},{'date':'11/03','total':267.5},{'date':'11/04','total':267.5},{'date':'11/05','total':267.5},{'date':'11/06','total':267.5},{'date':'11/07','total':267.5},{'date':'11/08','total':267.5},{'date':'11/09','total':267.5},{'date':'11/10','total':268.0},{'date':'11/11','total':268.0},{'date':'11/12','total':268.0},{'date':'11/13','total':268.0},{'date':'11/14','total':268.0},{'date':'11/15','total':268.0},{'date':'11/16','total':268.0},{'date':'11/17','total':264.5},{'date':'11/18','total':264.5},{'date':'11/19','total':264.5},{'date':'11/20','total':264.5},{'date':'11/21','total':264.5},{'date':'11/22','total':264.5},{'date':'11/23','total':264.5},{'date':'11/24','total':265.0},{'date':'11/25','total':265.0},{'date':'11/26','total':265.0},{'date':'11/27','total':265.0},{'date':'11/28','total':265.0},{'date':'11/29','total':265.0},{'date':'11/30','total':265.0},{'date':'12/01','total':256.5},{'date':'12/02','total':256.5},{'date':'12/03','total':256.5},{'date':'12/04','total':256.5},{'date':'12/05','total':256.5},{'date':'12/06','total':256.5},{'date':'12/07','total':256.5},{'date':'12/08','total':254.0},{'date':'12/09','total':254.0},{'date':'12/10','total':254.0},{'date':'12/11','total':254.0},{'date':'12/12','total':254.0},{'date':'12/13','total':254.0},{'date':'12/14','total':254.0},{'date':'12/15','total':251.0},{'date':'12/16','total':251.0},{'date':'12/17','total':251.0},{'date':'12/18','total':251.0},{'date':'12/19','total':249.5},{'date':'12/20','total':249.5},{'date':'12/21','total':249.5},{'date':'12/22','total':251.5},{'date':'12/23','total':251.5},{'date':'12/24','total':251.5},{'date':'12/25','total':251.5},{'date':'12/26','total':249.0},{'date':'12/27','total':249.0},{'date':'12/28','total':249.0},{'date':'12/29','total':252.0},{'date':'12/30','total':252.0},{'date':'12/31','total':252.0},{'date':'1/01','total':252.0},{'date':'1/02','total':252.0},{'date':'1/03','total':252.0},{'date':'1/04','total':252.0},{'date':'1/05','total':249.0},{'date':'1/06','total':249.0},{'date':'1/07','total':249.0},{'date':'1/08','total':249.0},{'date':'1/09','total':249.0},{'date':'1/10','total':249.0},{'date':'1/11','total':249.0},{'date':'1/12','total':248.0},{'date':'1/13','total':248.0},{'date':'1/14','total':248.0},{'date':'1/15','total':248.0},{'date':'1/16','total':248.0},{'date':'1/17','total':248.0},{'date':'1/18','total':248.0},{'date':'1/19','total':244.5},{'date':'1/20','total':244.5},{'date':'1/21','total':244.5},{'date':'1/22','total':244.5},{'date':'1/23','total':244.5},{'date':'1/24','total':244.5},{'date':'1/25','total':244.5},{'date':'1/26','total':243.5},{'date':'1/27','total':243.5},{'date':'1/28','total':243.5},{'date':'1/29','total':243.5},{'date':'1/30','total':243.5},{'date':'1/31','total':243.5},{'date':'2/01','total':243.5},{'date':'2/02','total':242.0},{'date':'2/03','total':242.0},{'date':'2/04','total':242.0},{'date':'2/05','total':242.0},{'date':'2/06','total':242.0},{'date':'2/07','total':242.0},{'date':'2/08','total':241.0},{'date':'2/09','total':244.0},{'date':'2/10','total':244.0},{'date':'2/11','total':244.0},{'date':'2/12','total':244.0},{'date':'2/13','total':244.0},{'date':'2/14','total':244.0},{'date':'2/15','total':244.0},{'date':'2/16','total':243.5},{'date':'2/17','total':243.5},{'date':'2/18','total':243.5},{'date':'2/19','total':243.5},{'date':'2/20','total':243.5},{'date':'2/21','total':243.5},{'date':'2/22','total':243.5},{'date':'2/23','total':237.0},{'date':'2/24','total':237.0},{'date':'2/25','total':237.0},{'date':'2/26','total':237.0},{'date':'2/27','total':237.0},{'date':'2/28','total':237.0},{'date':'3/01','total':237.0},{'date':'3/02','total':233.0},{'date':'3/03','total':233.0},{'date':'3/04','total':233.0},{'date':'3/05','total':233.0},{'date':'3/06','total':233.0},{'date':'3/07','total':233.0},{'date':'3/08','total':233.0},{'date':'3/09','total':229.0},{'date':'3/10','total':229.0},{'date':'3/11','total':229.0},{'date':'3/12','total':229.0},{'date':'3/13','total':229.0},{'date':'3/14','total':229.0},{'date':'3/15','total':229.0},{'date':'3/16','total':235.5},{'date':'3/17','total':235.5},{'date':'3/18','total':235.5},{'date':'3/19','total':235.5},{'date':'3/20','total':235.5},{'date':'3/21','total':235.5},{'date':'3/22','total':235.5},{'date':'3/23','total':228.5},{'date':'3/24','total':228.5},{'date':'3/25','total':228.5},{'date':'3/26','total':228.5},{'date':'3/27','total':228.5},{'date':'3/28','total':228.5},{'date':'3/29','total':228.5},{'date':'3/30','total':231.5},{'date':'3/31','total':231.5},{'date':'4/01','total':231.5},{'date':'4/02','total':231.5},{'date':'4/03','total':231.5},{'date':'4/04','total':231.5},{'date':'4/05','total':231.5},{'date':'4/06','total':229.5},{'date':'4/07','total':229.5},{'date':'4/08','total':229.5},{'date':'4/09','total':229.5},{'date':'4/10','total':229.5},{'date':'4/11','total':229.5},{'date':'4/12','total':229.5},{'date':'4/13','total':229.5},{'date':'4/14','total':231.0},{'date':'4/15','total':231.0},{'date':'4/16','total':231.0},{'date':'4/17','total':231.0},{'date':'4/18','total':224.0},{'date':'4/19','total':224.0},{'date':'4/20','total':225.5},{'date':'4/21','total':225.5},{'date':'4/22','total':225.5},{'date':'4/23','total':225.5},{'date':'4/24','total':225.5},{'date':'4/25','total':225.5},{'date':'4/26','total':225.5},{'date':'4/27','total':223.5},{'date':'4/28','total':223.5},{'date':'4/29','total':223.5},{'date':'4/30','total':223.5},{'date':'5/01','total':223.5},{'date':'5/02','total':223.5},{'date':'5/03','total':223.5},{'date':'5/04','total':226.0},{'date':'5/05','total':226.0},{'date':'5/06','total':226.0},{'date':'5/07','total':226.0},{'date':'5/08','total':226.0},{'date':'5/09','total':226.0},{'date':'5/10','total':226.0},{'date':'5/11','total':226.2},{'date':'5/12','total':226.2},{'date':'5/13','total':226.2},{'date':'5/14','total':226.2},{'date':'5/15','total':226.2},{'date':'5/16','total':226.2},{'date':'5/17','total':226.2},{'date':'5/18','total':223.4},{'date':'5/19','total':223.4},{'date':'5/20','total':223.4},{'date':'5/21','total':223.4},{'date':'5/22','total':223.4},{'date':'5/23','total':223.4},{'date':'5/24','total':223.4},{'date':'5/25','total':223.4},{'date':'5/26','total':226.4},{'date':'5/27','total':226.4},{'date':'5/28','total':226.4},{'date':'5/29','total':226.4},{'date':'5/30','total':226.4},{'date':'5/31','total':226.4},{'date':'6/01','total':223.6},{'date':'6/02','total':223.6},{'date':'6/03','total':223.6},{'date':'6/04','total':223.6},{'date':'6/05','total':223.6},{'date':'6/06','total':223.6},{'date':'6/07','total':223.6},{'date':'6/08','total':223.6},{'date':'6/09','total':223.6},{'date':'6/10','total':222.2},{'date':'6/11','total':222.2},{'date':'6/12','total':222.2},{'date':'6/13','total':222.2},{'date':'6/14','total':222.2},{'date':'6/15','total':222.6},{'date':'6/16','total':222.6},{'date':'6/17','total':222.6},{'date':'6/18','total':222.6},{'date':'6/19','total':222.6},{'date':'6/20','total':222.6},{'date':'6/21','total':222.6},{'date':'6/22','total':223.4},{'date':'6/23','total':223.4},{'date':'6/24','total':223.4},{'date':'6/25','total':223.4},{'date':'6/26','total':223.4},{'date':'6/27','total':223.4},{'date':'6/28','total':223.4},{'date':'6/29','total':224.0},{'date':'6/30','total':224.0},{'date':'7/01','total':224.0},{'date':'7/02','total':224.0},{'date':'7/03','total':224.0},{'date':'7/04','total':224.0},{'date':'7/05','total':224.0},{'date':'7/06','total':223.2},{'date':'7/07','total':221.0},{'date':'7/08','total':221.0},{'date':'7/09','total':221.0},{'date':'7/10','total':221.0},{'date':'7/11','total':221.0},{'date':'7/12','total':221.0},{'date':'7/13','total':222.4},{'date':'7/14','total':222.4}],
//  'ordinate_axis_min' : '0.0',
//  'ordinate_axis_max' : '330.0',
//  'goal' : ''};