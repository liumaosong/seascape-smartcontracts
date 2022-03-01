let NftBurning = artifacts.require("NftBurning");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");


let accounts;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let nftBurning = await NftBurning.at("0x24F30161085c082A637fc3B6B7F3969455260CD1");
    let crowns  = await Crowns.at("0xFde9cad69E98b3Cc8C998a8F2094293cb0bD6911");
    let factory  = await Factory.at("0x06fddbD58cb286DC1e7a9eB50eF67c9215478670");
    let nft     = await Nft.at("0x9ceAB9b5530762DE5409F2715e85663405129e54");

    // show current account
    let owner = accounts[0];
    console.log(`Using ${owner}`);


    // startSession parameters
    let startTime = Math.floor(Date.now()/1000) + 300;
    let period = 3600 * 24 * 7; // one day * 5
    let generation = 1;
    let interval = 120; // 5 minutes
    let fee = web3.utils.toWei("1", "ether");
    let minStake = web3.utils.toWei("100", "milli"); // 0.1 ether
    let maxStake = web3.utils.toWei("100", "ether");


    // call startSession
    console.log("attemping to start a session");
    let sessionStarted = await nftBurning.startSession(
        startTime,
        period,
        generation,
        interval,
        fee,
        minStake,
        maxStake,
	    {from: owner})
      .catch(console.error);
    console.log("Started a new session");


}.bind(this);
