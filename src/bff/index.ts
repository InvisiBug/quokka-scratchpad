import { makeRequest } from "./bffTester";
import { createObjectCsvWriter } from "csv-writer";
import { viewQuery, testingViewQuery } from "./queries";
import {
  FootballVariables,
  HorseRacingVariables,
  GreyhoundVariables,
  TennisVariables,
  IceHockeyVariables,
  BaseballVariables,
  homeVariables,
} from "./variables";

import { writeFileSync } from "fs";

import { calculate75thPercentile, cardOptions } from "./utils";

(async () => {
  const maxNumberOfCards = 10;
  const runs = 10; // Max 150

  const sports: Record<string, typeof FootballVariables> = {
    football: FootballVariables,
    horseRacing: HorseRacingVariables,
    home: homeVariables,
  };

  // const results: {
  //   home: Record<string, any[]>;
  //   football: {};
  //   horseRacing: {};
  // } = { home: {}, football: {}, horseRacing: {} };

  const results: any = { home: {}, football: {}, horseRacing: {} };

  const formattedData = [];

  console.log("🛠️ Collecting data...");

  /*
   * Request data from BFF
   */
  for (let run = 0; run < runs; run++) {
    for (const [sport] of Object.entries(sports)) {
      results[sport][`run${run + 1}`] = [];

      let generatedCardOptions: Record<string, number> = {};

      for (const property of cardOptions) {
        // for (let i = 1; i <= maxNumberOfCards; i++) {

        const i = 5;
        const newCardGeneratedOptions = { ...generatedCardOptions }; // Some mutation thing, causing issues
        newCardGeneratedOptions[property] = i + 1;

        const variables = sports[sport as keyof typeof sports];

        const { responseTime, contentLength, errors, encodedBodySize } = await makeRequest({
          query: testingViewQuery,
          sportVariables: variables,
          overrideVariables: newCardGeneratedOptions,
        });

        if (responseTime) {
          console.log("We have a response", responseTime, errors);
        }

        const analysisData = {
          sport,
          adjustedOption: property,
          adjustedValue: i,
          responseTime,
          contentLength: encodedBodySize,
        };

        results[sport][`run${run + 1}`].push(analysisData);
        // }
      }
    }
  }

  console.log("Finished collecting data");

  /*
   * Process data into a format that can be written to a CSV
   */
  let counter = 0;
  for (const property of cardOptions) {
    // for (let i = 0; i < maxNumberOfCards; i++) {
    const i = 5;
    const formattedEntry: any = {
      property,
      numberOfCardsRequested: i + 1,
    };

    for (let run = 1; run <= runs; run++) {
      const runKey = `run${run}`;

      if (results["home"] && results["home"][runKey]) {
        formattedEntry[`homeResponseTimeRun${run}`] = results["home"][runKey][counter + i].responseTime;
      }
      if (results["football"] && results["football"][runKey]) {
        formattedEntry[`footballResponseTimeRun${run}`] = results["football"][runKey][counter + i].responseTime;
      }
      if (results["horseRacing"] && results["horseRacing"][runKey]) {
        formattedEntry[`horseRacingResponseTimeRun${run}`] = results["horseRacing"][runKey][counter + i].responseTime;
      }
    }

    console.log("This is the data", formattedEntry);

    const { home75thPercentile, football75thPercentile, horseRacing75thPercentile } = calculate75thPercentile(formattedEntry, runs);

    formattedEntry["homeAverage"] = home75thPercentile;
    formattedEntry["footballAverage"] = football75thPercentile;
    formattedEntry["horseracingAverage"] = horseRacing75thPercentile;

    formattedEntry["HomeContentLength"] = results["home"]["run1"][counter + i].contentLength;
    formattedEntry["FootballContentLength"] = results["football"]["run1"][counter + i].contentLength;
    formattedEntry["HorseRacingContentLength"] = results["horseRacing"]["run1"][counter + i].contentLength;

    console.log("\n Formatted Entry:", formattedEntry);

    formattedData.push(formattedEntry);
    // }
    counter += maxNumberOfCards;
  }

  console.log("\n FormattedData", formattedData);

  // //* Save json strings
  // const jsonStrings = JSON.stringify(formattedData, null, 2);
  // writeFileSync("src/bff/analysis2.json", jsonStrings, "utf8");

  const jsonString = JSON.stringify(results, null, 2);
  writeFileSync("src/bff/analysis.json", jsonString, "utf8");

  //* CSV writer
  const csvWriter = createObjectCsvWriter({
    path: "output.csv",
    header: [
      { id: "property", title: "Adjusted Option" },
      { id: "numberOfCardsRequested", title: "Number of Cards Requested" },

      { id: "HomeContentLength", title: "HomeContentLength" },
      { id: "homeAverage", title: "home75thPercentile" },

      { id: "FootballContentLength", title: "FootballContentLength" },
      { id: "footballAverage", title: "football75thPercentile" },

      { id: "HorseRacingContentLength", title: "HorseRacingContentLength" },
      { id: "horseracingAverage", title: "Horse Racing 75thPercentile" },
    ],
  });

  await csvWriter.writeRecords(formattedData);
  console.log("CSV file has been written to output.csv");
})();

/*
 The bff works by returning all the data for the number of requested cards
 and just the uri for all other cards on the page

 The theory is that the page will want to get all the data for the cards that are currently
 on the page and use the uri to get the data for the other cards when they are scrolled into view

*/
