import { generateStandardCardOptions } from "../../../utils";

export const homeVariables = {
  urn: "ppb:tbd:view:generic:home",
  numberOfFilledCardsInCardGroup: 2,
  ...generateStandardCardOptions(),
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
      id: "experiment-diogo",
      variant: "control",
    },
  ],
};
