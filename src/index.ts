import { makeRequest } from "./bff/bffTester";
import { viewQuery } from "./bff/queries";
import { footballVariables, horseRacingVariables, greyhoundVariables, tennisVariables, iceHockeyVariables, baseballVariables } from "./bff/variables";

(async () => {
  const requestedCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const requestedCards = [1, 2];

  const sports = {
    football: footballVariables,
    horseRacing: horseRacingVariables,
    greyhounds: greyhoundVariables,
    tennis: tennisVariables,
    iceHockey: iceHockeyVariables,
    baseball: baseballVariables,
  };

  const finalObject: Record<
    string,
    {
      requestedCards: number;
      responseTime: number;
      contentLength: number;
    }[]
  > = {};

  console.error("🛠️ Working...");
  for (const [key, value] of Object.entries(sports)) {
    finalObject[key] = [];

    const randomizedRequestCards = requestedCards.sort(() => Math.random() - 0.5);

    for (const requestedCard of randomizedRequestCards) {
      const { responseTime, contentLength } = await makeRequest({
        query: viewQuery,
        sportVariables: footballVariables,
        overrideVariables: { numberOfFilledCardsInView: 3 },
      });

      finalObject[key].push({
        requestedCards: requestedCard,
        responseTime,
        contentLength,
      });
    }
  }

  console.log(finalObject);
})();
