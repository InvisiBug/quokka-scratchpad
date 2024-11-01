import { generateStandardCardOptions } from "../../../utils";

export const testingHorseRacingVariables = {
  urn: "ppb:tbd:view:sport:7",
  numberOfFilledCardsInCardGroup: 2,
  numberOfFilledCardsInView: 3,
  ...generateStandardCardOptions(),
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
      variant: "control",
    },
  ],
};