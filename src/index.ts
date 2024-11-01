import { makeRequest } from "./bff/bffTester";
import { viewQuery, testingViewQuery } from "./bff/queries";
import {
  testingFootballVariables,
  testingHorseRacingVariables,
  testingGreyhoundVariables,
  testingTennisVariables,
  testingIceHockeyVariables,
  testingBaseballVariables,
} from "./bff/variables";

import { writeFileSync } from "fs";

import { getRandomElement, cardOptions } from "./bff/utils";

(async () => {
  const numberOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const numberOfCards = [1, 2, 3];

  const sports = {
    football: testingFootballVariables,
    horseRacing: testingHorseRacingVariables,
    greyhounds: testingGreyhoundVariables,
    tennis: testingTennisVariables,
    iceHockey: testingIceHockeyVariables,
    baseball: testingBaseballVariables,
  };

  const finalObject: Record<
    string,
    {
      cardOptions: Record<string, number>;
      responseTime: number;
      contentLength: number;
      errors?: string;
    }[]
  > = {};

  console.error("🛠️ Working...");

  for (const [sport] of Object.entries(sports)) {
    finalObject[sport] = [];

    const randomRequestedCardNumberArray = numberOfCards.sort(() => Math.random() - 0.5);

    for (const totalRequestedCards of numberOfCards) {
      let generatedCardOptions: Record<string, number> = {};

      for (const property of cardOptions) {
        generatedCardOptions[property] = getRandomElement(numberOfCards);
      }

      const { responseTime, contentLength, errors } = await makeRequest({
        query: testingViewQuery,
        sportVariables: testingFootballVariables,
        overrideVariables: generatedCardOptions,
      });

      const data = {
        cardOptions: generatedCardOptions,
        responseTime,
        contentLength,
        // errors: errors,
      };

      finalObject[sport].push(data);
    }
  }

  const jsonString = JSON.stringify(finalObject, null, 2);
  // console.log(jsonString);
  writeFileSync("src/bff/analysis.json", jsonString, "utf8");
})();

/*
 The bff works by returning all the data for the number of requested cards
 and just the uri for all other cards on the page

 The theory is that the page will want to get all the data for the cards that are currently
 on the page and use the uri to get the data for the other cards when they are scrolled into view

*/
