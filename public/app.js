'use strict';
/*global fetch Plotly document*/

const url = 'https://sheltered-cove-26373.herokuapp.com/getOrderBooks?market=';
let intervalSet;
let requestTryCount = 3;

/*
newCurrenctPair
- First function to be called.
- setInterval is called which will update the graph every 5 seconds.
- Then we trigger fetchAndGraph to fetch data and graph the results..
- This funtion will be called again if different currency pair is picked.
*/

module.exports.newCurrencyPair = function ( currencyPair ) {
    if ( intervalSet ) {
        clearInterval( intervalSet );
    }
    this.fetchAndGraph( currencyPair );
    intervalSet = setInterval( this.fetchAndGraph.bind( this ), 5000, currencyPair );
};

module.exports.fetchAndGraph = async function ( currencyPair = 'BTC_ETH' ) {
    let response,
        result;

    try {
        response = await fetch( `${url}${currencyPair}` );
        result = await response.json();
        console.log( result.bittrex );
    } catch ( e ) {
        // in case the server is down, retry 3 times before stopping to make further requests.
        if ( requestTryCount < 1 ) {
            clearInterval( intervalSet );
        }
        requestTryCount -= 1;
    }

    if ( result ) {
        let traces = [];
        // Loop through all exchanges and create X (rate), Y (cumulated quanity) arrays.
        for ( let order in result ) {
            let asksData = result[order].asks;
            let bidsData = result[order].bids;
            traces.push( this.formatDataForGraph( asksData, order, 'asks' ) );
            traces.push( this.formatDataForGraph( bidsData, order, 'bids' ) );
        }
        const graphDiv = document.getElementById( 'orderBookGraph' );
        Plotly.newPlot( graphDiv, traces, { title: 'Crypto Combined Order Book' } );
    }
};

module.exports.formatDataForGraph = function( orderData, order, type ) {
    let graphTrace = { x: [], y: [], name: `${order} ${type}` };
    orderData.forEach( ( coords ) => {
        graphTrace.x.push( coords[0] );
        graphTrace.y.push( coords[2] );
    } );
    return graphTrace;
};

if ( window.testMode !== true ) {// initialize
    module.exports.newCurrencyPair();
}
