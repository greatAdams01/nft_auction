import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [ accCreator, accBob ] =
  await stdlib.newTestAccounts(2, startingBalance);
console.log('Hello, Creator and Bob!');

console.log(`Havig creator create a testing nft`)
const theNft = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 })
const nftId = theNft.id
const minBid = stdlib.parseCurrency(2)
const lenInBlocks = 10
const params = { nftId, minBid, lenInBlocks }

console.log('Launching...');
const ctcCreator = accCreator.contract(backend);
await ctcCreator.participants.Creator({
  getSale: () => {
    console.log(`Creators set params of sale:`, params)
    return params
  },
  auctionReady: () => {
    startBidders();
  },
  seeBid: (who, amt) => {
    console.log(`Creator saw that ${stdlib.formatAddress(who)} bid ${stdlib.formatCurrency(amt)}`)
  },
  showOutCome: (winner, amt) => {
    console.log(`Creator saw that ${stdlib.formatAddress(winner)} won with ${stdlib.formatCurrency(amt)}`)
  }
})


