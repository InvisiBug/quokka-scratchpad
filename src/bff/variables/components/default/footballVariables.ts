export const defaultFootballVariables = {
  urn: "ppb:tbd:view:sport:1",
  numberOfFilledCardsInCardGroup: 2,
  numberOfFilledCardsInView: 3,
  withBottomBar: true,
  withLeftSidebar: true,
  withRegulatoryData: true,
  withPageInfo: true,
  preferences: {
    marketTab: "SPORTSBOOK",
    moduleLayout: "COUPON",
    userProducts: ["SPORTSBOOK", "GAMES"],
    favoriteSports: [],
  },
  productExclusions: [],
  experiments: [
    {
      id: "exp-cms-bf-football-price-experiment",
      variant: "football-price-experiment-v1",
    },
  ],
};
