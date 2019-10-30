// MarsDB ~= InMemory MongoDB
const MarsDB = require('marsdb');
const items = new MarsDB.Collection('items');

async function main() {
  await items.insert({ name: 'Jake Peralta' });
  await items.insert({ name: 'Charles Boyle' });

  const foundItems = await items.find({ name: 'Amy Santiago' });

  console.log(foundItems);
}

main();
