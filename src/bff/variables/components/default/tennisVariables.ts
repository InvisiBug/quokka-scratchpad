export const defaultTennisVariables = {
  urn: "ppb:tbd:view:sport:2",
  numberOfFilledCardsInCardGroup: 2,
  numberOfFilledCardsInView: 3,
  withBottomBar: false,
  withLeftSidebar: false,
  withRegulatoryData: false,
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
      variant: "control",
    },
  ],
};
