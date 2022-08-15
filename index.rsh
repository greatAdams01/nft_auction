'reach 0.1';

export const main = Reach.App(() => {
  const Creator = Participant('Creator', {
    // Specify creator's interact interface here
    getSale: Fun([], Object({
      nftId: Token,
      minBid: UInt,
      lenInBlocks: UInt,
    })),
    auctionReady: Fun([], Null),
    seeBid: Fun([Address, UInt], Null),
    showOutCome: Fun([Address, UInt], Null)
  });
  const Bidder = API('Bidder', { 
    bid: Fun([UInt], Tuple(Address, UInt))
   })
  init();

  Creator.only(() => {
    const { nftId, minBid, lenInBlocks } = declassify(interact.getSale())
  })
  Creator.publish(nftId, minBid, lenInBlocks);
  const amt = 1
  commit();
  Creator.pay([[ amt, nftId ]])
  Creator.interact.auctionReady()


  exit();
});
