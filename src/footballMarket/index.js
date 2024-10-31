import { pathOr, values, allPass, propEq, anyPass, curry, reject, equals, map, isNil } from "ramda";
import { liveState } from "./liveState";

const isActiveOrSuspended = anyPass([propEq("displayStatus", "active"), propEq("displayStatus", "suspended")]);

const isSuperBoost = propEq("type", "super-boost");

const displayableSuperBoost = allPass([isActiveOrSuspended, isSuperBoost]);

const displayOrderComparator = (a, b) => a.displayOrder - b.displayOrder;
const cashoutableComparator = (a, b) => (a.cashoutable === true ? 0 : 1) - (b.cashoutable === true ? 0 : 1);
const cashoutableThenDisplayOrderComparator = (a, b) => cashoutableComparator(a, b) || displayOrderComparator(a, b);

const marketsByDisplayOrder = displayOrderComparator;
const marketsByCashoutable = cashoutableThenDisplayOrderComparator;
const defaultMarketSorter = marketsByDisplayOrder;
const marketSorters = {
  BY_DISPLAY_ORDER: marketsByDisplayOrder,
  BY_CASHOUTABLE: marketsByCashoutable,
};

const getMarketSorter = (name) => marketSorters[name] || defaultMarketSorter;
const marketSorter = getMarketSorter("default sorter");

const toOutcomeData = curry((outcomeById, { id, market }) => {
  // console.log("toOutcomeData", { outcomeById, id, market });

  const outcome = outcomeById[id];
  if (isNil(outcome)) return false;
  if (outcome.originalOutcome) {
    const originalOutcomePrice = path([outcome.originalOutcome, "price"], outcomeById);
    if (originalOutcomePrice) {
      return {
        outcome: {
          ...outcome,
          wasPrice: originalOutcomePrice,
        },
        market,
      };
    }
  }
  return { outcome, market };
});

// const mapOutcomes = curry((outcomeById, marketsAndOutcomes) => reject(equals(false), map(toOutcomeData(outcomeById), marketsAndOutcomes)));
// const mapOutcomes = () => [{ outcome: undefined }];
const mapOutcomes = () => ["hello"];

const superBoostMarket = (state) => {
  return values(state.markets)
    .filter(displayableSuperBoost)
    .sort(state.ui["footballAccordion.marketSorter"]) //! No market sorter on live data
    .sort(displayOrderComparator)
    .map((market) => {
      // console.log("🚀 ~ .map ~ market:", market);
      const outcomeIds = pathOr([], ["outcomes"], market);
      if (!outcomeIds) {
        return market;
      }

      // console.log(market);

      // console.log(
      //   "🚀 ~ map Outcomes:",
      //   mapOutcomes(
      //     state.outcomes,
      //     outcomeIds.map((outcomeId) => {
      //       return { id: outcomeId };
      //     }),
      //   )[0].outcome,
      // );

      const data2 = { undefined };
      let data3;

      try {
        data3 = data2[0].outcomes;
      } catch (e) {
        console.log(e);
      }

      console.log(data3);

      return {
        ...market,
        outcome: mapOutcomes(
          state.outcomes,
          outcomeIds.map((outcomeId) => {
            return { id: outcomeId };
          }),
        )[0].outcome, // !Specifically highlighted this line
      };
    });
};

console.log(superBoostMarket(liveState));
