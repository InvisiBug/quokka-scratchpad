export const getRandomElement = (arr: number[]): number => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const cardOptions = [
  "numberOfCardsInAllCompetitionsView",
  "numberOfCardsInAllMarketsView",
  "numberOfCardsInCompetitionView",
  "numberOfCardsInEventView",
  "numberOfCardsInGamingCategoryView",
  "numberOfCardsInGamingSegmentationView",
  "numberOfCardsInGamingView",
  "numberOfCardsInGenericView",
  "numberOfCardsInImsPromotionView",
  "numberOfCardsInNotFoundView",
  "numberOfCardsInPromotionsView",
  "numberOfCardsInRaceView",
  "numberOfCardsInSportView",
];

export const generateStandardCardOptions = () => {
  let overrideVariables: Record<string, number> = {};

  for (const property of cardOptions) {
    overrideVariables[property] = 3;
  }

  return overrideVariables;
};
