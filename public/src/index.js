// var React = require('react');
// var ReactDOM = require('react-dom');

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { range } from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;

// Create line chart React Component
// const LineChart = ({ data }) => {
//   return <svg />
// };
//
// const App = () =>
//   const data = [];
//
//   return <LineChart data={data}/>
// };

  // const App = () => (
  //   	<h1>Hello</h1>
  // );
  // const rootElement = document.getElementById('root');
  // ReactDOM.render(<App />, rootElement);



  const csvUrl = 'https://opendata-geohive.hub.arcgis.com/datasets/d9be85b30d7748b5b7c09450b8aede63_0.csv?outSR={"latestWkid"%3A3857%2C"wkid"%3A102100}';

  // Parse with d3.csv - uses Fetch API and async/await
  d3.csv(csvUrl).then(data => {

    //const latestDateEntry = data.columns[data.length - 1];
    let latestSetStart = data.length - 25;  //EOF, minus counties
    let latestDateEntries = data.filter (function(d){
      return d.OBJECTID >= latestSetStart;
    });

    const commaFormatter = d3.format(',');

    // Logs the last 26 entries, which is the latest entry per County
    // It then Maps this to extract the ConfirmedCovidCases value from each
    console.log(latestDateEntries);
    //console.log( latestDateEntries.map(d => d.ConfirmedCovidCases ));

    const latestCountyNumbers = latestDateEntries.map(d => +d.ConfirmedCovidCases );
    console.log(latestCountyNumbers);

    const latestCountyDeaths = latestDateEntries.map(d => +d.ConfirmedCovidDeaths );
    console.log(latestCountyDeaths);

    const totalCases = latestCountyNumbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalDeaths = latestCountyDeaths.reduce((accumulator, currentValue) => accumulator + currentValue); //cant be used with this dataset

    const message = commaFormatter(totalCases) + ' total Cases' + '\nas of ' + latestDateEntries[25].TimeStamp;

    document.getElementById('message-container').textContent = message;
    //console.log(data);
    });


    // ******* notes and alternative less efficient methods *******

    // LEA Data - 14 Day Incident Rates per 100K
    //const csvUrl = 'https://opendata-geohive.hub.arcgis.com/datasets/27d401c9ae084097bb1f3a69b69462a1_0.csv?outSR={"latestWkid"%3A3857%2C"wkid"%3A102100}';

    //   If converting to JSON objects
    //   d3.csv(",", csvUrl, function(d) {
    //     return {
    //       //year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    //       //length: +d.Length // convert "Length" column to number
    //       ObjectId: +d.OBJECTID,
    //       OrigId: +d.ORIGID,
    //       CountyName: d.CountyName,
    //       Population: +d.PopulationCensus16,
    //       TimeStamp:  d.TimeStamp,
    //       Cases: +d.ConfirmedCovidCases
    //       // ,
    //       // Deaths: d.ConfirmedCovidDeaths,
    //       // Recovered: d.ConfirmedCovidRecovered
    //     };
    //   }).then(function(data) {
    //     console.log(data);
    // });

    // Imported data info - ** goes above the document.getEl message container **
    // let message = ';'
    // message = message + Math.round(d3.csvFormat(data).length / 1024) + ' kB\n';
    // message = message + data.length + ' rows\n';
    // message = message + data.columns.length + ' columns';

  // With manual fetch, async, and await.
  // const fetchText = async (url) => {
  //   const response = await fetch(url);
  //   return await response.text();
  // };
  // fetchText(csvUrl).then(text => {
  //   const data = d3.csvParse(text);
  //   let message = '';
  //   message = message + Math.round(text.length / 1024) + ' kB\n';
  //   message = message + data.length + ' rows\n';
  //   message = message + data.columns.length + ' columns';
  //   document.getElementById('message-container').textContent = message;
  // });

  // Pyramid of Doom.
  // fetch(url).then(response => {
  //   response.text().then(text => {
  //     console.log(text);
  //   });
  // });
