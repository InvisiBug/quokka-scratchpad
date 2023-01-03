import { prop, sortBy, compose, sortWith, path } from "ramda";
import { data } from "./data";

//* Un-sorted data ()
for (const outcome of data) {
  console.log(outcome.price.decimal);
}

//* Sorted by price
const priceSortedData = data.sort((a, b) => (a.price.decimal > b.price.decimal ? 1 : -1));

for (const outcome of priceSortedData) {
  console.log(outcome.price.decimal);
}

//* Sorted by names
const horseNameSortedData = data.sort((a, b) =>
  a.name.split(" ")[0].concat(" ", a.name.split(" ")[1].padStart(2, "0")) > b.name.split(" ")[0].concat(" ", b.name.split(" ")[1].padStart(2, "0"))
    ? 1
    : -1,
);

for (const outcome of horseNameSortedData) {
  console.log(outcome.name);
}

//* Ramda sort by name
const desc = (a) => -a;
const results = sortBy(compose(desc, prop("name")), data);
// const results = sortBy(prop("name"), data);
for (const outcome of results) {
  console.log(outcome.name);
}

//* Ramda sort by decimal price
const results2 = sortBy(path(["price", "decimal"]), data);
for (const outcome of results2) {
  console.log(outcome.price.decimal);
}

console.log(data[0].price.decimal);
