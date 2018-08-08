'use strict';
/* global window */
window.testMode = true;
const app = require( '../public/app' );
const mockData = require( './mock/mockData' );


describe( 'Tesing App Functionaly', ()=>{
    const setInterval = window.setInterval,
        clearInterval = window.clearInterval,
        fetchAndGraph = app.fetchAndGraph,
        formatDataForGraph = app.formatDataForGraph;

    afterEach( ()=>{
        // after each test make sure each function is restored to original.
        window.setInterval = setInterval,
        window.clearInterval = clearInterval,
        app.fetchAndGraph = fetchAndGraph,
        app.formatDataForGraph = formatDataForGraph;
    } );

    it( 'newCurrencyPair, should set interval and call fetchAndGraph', () => {
        // mock functions.
        app.fetchAndGraph = jest.fn();
        window.clearInterval = jest.fn();
        window.setInterval = jest.fn();

        app.newCurrencyPair();
        expect( window.clearInterval ).not.toBeCalled();
        expect( window.setInterval.mock.calls[0][0] ).toEqual( expect.any( Function ) );
        expect( window.setInterval.mock.calls[0][1] ).toBe( 5000 );
        expect( window.setInterval.mock.calls[0][2] ).toBeUndefined();
        expect( app.fetchAndGraph ).toBeCalled();
    } );

    it( 'newCurrencyPair, should clearInterval if it was set prior', () => {
        window.clearInterval = jest.fn();
        app.fetchAndGraph = jest.fn();
        // initialize the function (start-up)
        app.newCurrencyPair();

        window.setInterval = jest.fn();
        // this would be called again if different market (currency pair) was selected.
        app.newCurrencyPair( 'BTC_LTC' );
        expect( window.clearInterval ).toBeCalled();
        expect( app.fetchAndGraph ).toBeCalled();
        expect( window.setInterval.mock.calls[0][0] ).toEqual( expect.any( Function ) );
        expect( window.setInterval.mock.calls[0][1] ).toBe( 5000 );
        expect( window.setInterval.mock.calls[0][2] ).toBe( 'BTC_LTC' );
    } );

    it( 'formatDataForGraph, should create object for Plotly graph with name, and X, Y values', () => {
        let result = app.formatDataForGraph( mockData.data.bittrex.asks, 'bittrex', 'asks' );
        expect( result ).toEqual( {
            x: [ 0.05728469, 0.05728874, 0.05728877 ],
            y: [ 18.958, 18.988999999999997, 19.429999999999996 ],
            name: 'bittrex asks' } );
    } );

    it( 'fetchAndGraph', () => {
        // TODO: Mock Out fetch and response to fully test the solution.
    } );
} );
