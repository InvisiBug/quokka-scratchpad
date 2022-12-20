import { prop, sortBy } from "ramda";
import { data } from "./data.js";

for (const outcome of data) {
  console.log(outcome.name);
}

const priceSortedData = data.sort((a, b) => (a.price.decimal > b.price.decimal ? 1 : -1));

for (const outcome of priceSortedData) {
  console.log(outcome.price.decimal);
}

const horseNameSortedData = data.sort((a, b, index) =>
  a.name.split(" ")[0].concat(" ", a.name.split(" ")[1].padStart(2, "0")) > b.name.split(" ")[0].concat(" ", b.name.split(" ")[1].padStart(2, "0"))
    ? 1
    : -1,
);

for (const outcome of horseNameSortedData) {
  console.log(outcome.name);
}

const point = 1;
const newName = data[point].name.split(" ")[0].concat(" ", data[point].name.split(" ")[1].padStart(2, "0"));

console.log(newName);
