console.log("hello");

const arr1 = [1, 2, 1];

// This is how you build a list of something that all share the same part of their name
// like livingRoom, bedRoom
const rooms = ["living", "bed", "bath"];

const roomNames = rooms.flatMap((room) => `${room}Room`);

console.log(roomNames);
