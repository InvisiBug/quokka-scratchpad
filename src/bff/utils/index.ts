export const getRandomElement = (arr: number[]): number => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const cardOptions = [
  // "numberOfCardsInAllCompetitionsView",
  // "numberOfCardsInAllMarketsView",
  // "numberOfCardsInCompetitionView",
  // "numberOfCardsInEventView",
  // "numberOfCardsInGamingCategoryView",
  // "numberOfCardsInGamingSegmentationView",
  // "numberOfCardsInGamingView",
  // "numberOfCardsInGenericView",
  // "numberOfCardsInImsPromotionView",
  // "numberOfCardsInNotFoundView",
  // "numberOfCardsInPromotionsView",
  // "numberOfCardsInRaceView",
  "numberOfCardsInSportView",
];

export const defaultCardOptions = {
  numberOfCardsInAllCompetitionsView: 1,
  numberOfCardsInAllMarketsView: 1,
  numberOfCardsInCompetitionView: 1,
  numberOfCardsInEventView: 1,
  numberOfCardsInGamingCategoryView: 1,
  numberOfCardsInGamingSegmentationView: 1,
  numberOfCardsInGamingView: 1,
  numberOfCardsInGenericView: 1,
  numberOfCardsInImsPromotionView: 1,
  numberOfCardsInNotFoundView: 1,
  numberOfCardsInPromotionsView: 1,
  numberOfCardsInRaceView: 1,
  numberOfCardsInSportView: 1,
};

export const generateStandardCardOptions = (overrideVars: Record<string, number> = {}) => {
  let defaultVals: Record<string, number> = defaultCardOptions;

  const overrideVariables = { ...defaultVals, ...overrideVars };

  return overrideVariables;
};

export const getAverage = (obj: Record<string, number>): number => {
  const values = Object.values(obj);
  const sum = values.reduce((acc, value) => acc + value, 0);
  return parseFloat((sum / values.length).toFixed(2));
};

function calculatePercentile(data: number[], percentile: number): number {
  data.sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * data.length) - 1;
  return data[index];
}

export const calculate75thPercentile = (data: Record<string, number>, runs: number): any => {
  const homeResponseTimes: number[] = [];
  const footballResponseTimes: number[] = [];
  const horseRacingResponseTimes: number[] = [];

  console.log(runs);
  // // data.forEach((entry) => {
  for (let run = 1; run <= runs; run++) {
    if (data[`homeResponseTimeRun${run}`] !== undefined) {
      console.log(data[`homeResponseTimeRun${run}`]);
      homeResponseTimes.push(data[`homeResponseTimeRun${run}`]);
    }

    if (data[`footballResponseTimeRun${run}`] !== undefined) {
      console.log(data[`footballResponseTimeRun${run}`]);
      footballResponseTimes.push(data[`footballResponseTimeRun${run}`]);
    }

    if (data[`horseRacingResponseTimeRun${run}`] !== undefined) {
      horseRacingResponseTimes.push(data[`horseRacingResponseTimeRun${run}`]);
    }
  }
  // });

  console.log(footballResponseTimes);

  const home75thPercentile = calculatePercentile(homeResponseTimes, 75);
  const football75thPercentile = calculatePercentile(footballResponseTimes, 75);
  const horseRacing75thPercentile = calculatePercentile(horseRacingResponseTimes, 75);

  return {
    home75thPercentile,
    football75thPercentile,
    horseRacing75thPercentile,
  };
};
