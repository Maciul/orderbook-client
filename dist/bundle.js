var ob=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";let n,o=3;e.exports.newCurrencyPair=function(e){n&&clearInterval(n),this.fetchAndGraph(e),n=setInterval(this.fetchAndGraph.bind(this),5e3,e)},e.exports.fetchAndGraph=async function(e="BTC_ETH"){let t,r;try{t=await fetch(`https://sheltered-cove-26373.herokuapp.com/getOrderBooks?market=${e}`),r=await t.json(),console.log(r.bittrex)}catch(e){o<1&&clearInterval(n),o-=1}if(r){let e=[];for(let t in r){let n=r[t].asks,o=r[t].bids;e.push(this.formatDataForGraph(n,t,"asks")),e.push(this.formatDataForGraph(o,t,"bids"))}const t=document.getElementById("orderBookGraph");Plotly.newPlot(t,e,{title:"Crypto Combined Order Book"})}},e.exports.formatDataForGraph=function(e,t,r){let n={x:[],y:[],name:`${t} ${r}`};return e.forEach(e=>{n.x.push(e[0]),n.y.push(e[2])}),n},!0!==window.testMode&&e.exports.newCurrencyPair()}]);