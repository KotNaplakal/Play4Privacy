/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable import-no-unresolved */
const PlayToken = artifacts.require('PlayToken');
const Game = artifacts.require('P4PGame');
const Pool = artifacts.require('P4PPool');
const DonationSplitter = artifacts.require('P4PDonationSplitter');

const BigNumber = require('bignumber.js');
const should = require('should'); // eslint-disable-line

contract('P4P mechanics', (accounts) => {
    console.log(`accounts: ${accounts}`);

    const token = PlayToken.at(PlayToken.address);
    const game = Game.at(Game.address);
    const pool = Pool.at(Pool.address);
    const donationSplitter = DonationSplitter.at(DonationSplitter.address);

    // dirty hardcoding shortcut for the donation splitter
    const splitterRecv1 = "0x883702a1b9B29119acBaaa0E7E0a2997FB8EBcd3";
    const splitterRecv2 = "0x9abd6265Eaca022c1ccF931a7E9150dA0E7Db7Ec";

    console.log(`
    token: ${token.address}
    game:  ${game.address}
    pool:  ${pool.address}
    splitter:  ${donationSplitter.address}
    `);

    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];
    const user3 = accounts[3];
    const user4 = accounts[4];
    // create a random address in order to have one with 0 balance
    const randomPrivacyOrg = `0x${web3.sha3(Date.now().toString()).slice(26)}`;

    it('game and pool contract must have the correct token address', async () => {
        const gameTok = await game.getTokenAddress();
        const poolTok = await pool.playToken();
        assert.equal(PlayToken.address, gameTok, `token address mismatch. Game: ${gameTok}, PlayToken: ${PlayToken.address}`); // eslint-disable-line
        assert.equal(PlayToken.address, poolTok, `token address mismatch. Pool: ${poolTok}, PlayToken: ${PlayToken.address}`); // eslint-disable-line
    });

    it('cannot send Ether before donation period opened', async () => {
        await pool.sendTransaction({ from: accounts[1], value: web3.toWei(1) }).should.be.rejected();
    });

    it('permission restrictions: startNextPhase(), [set|lock]TokenController(), setPoolContract(), shutdown()',
        async () => {
            await pool.startNextPhase({ from: user1 }).should.be.rejected();
            await game.setTokenController(user1, { from: user1 }).should.be.rejected();
            await game.lockTokenController(user1, { from: user1 }).should.be.rejected();
            await game.setPoolContract(user1, { from: user1 }).should.be.rejected();
            await game.shutdown({ from: user1 }).should.be.rejected();
        });

    function randDonAmount() {
        return (Math.random() * 1.5) ** 3; // something a la power law
    }

    // in order to select the deterministic amounts, change the mappings to map(e => [e[0], e[1]])
    const donations = {
        round1: [
            [ user1, 3, randDonAmount() ],
            [ user2, 5, randDonAmount() ],
            [ user2, 1, randDonAmount() ],
            [ user1, 0.13, randDonAmount() ],
            [ user2, 2.5, randDonAmount() ],
        ].map(e => [ e[0], e[2] ]),
        round2: [
            [ user3, 0.42, randDonAmount() ],
            [ user1, 0.055, randDonAmount() ],
            [ user4, 1, randDonAmount() ],
        ].map(e => [ e[0], e[2] ]),
    };
    // console.log(`donations: ${JSON.stringify(donations)}`)

    // const totalDonated = donations.round1.concat(donations.round2).map(d => d[1]).reduce((sum, e) => sum + e);
    // 27,1153 tok per Eth

    it('donations are correctly counted', async () => {
        // starting donation_round 1
        await pool.startNextPhase();

        for (e of donations.round1) {
            await pool.sendTransaction({ from: e[0], value: web3.toWei(e[1])}); // eslint-disable-line
        }

        // switching to playing
        await pool.startNextPhase();

        // switching to donation_round 2
        await pool.startNextPhase();

        for (e of donations.round2) {
            await pool.sendTransaction({ from: e[0], value: web3.toWei(e[1])}); // eslint-disable-line
        }

        const ethBal = web3.eth.getBalance(Pool.address);
        const round1 = await pool.totalPhase1Donations();
        const round2 = await pool.totalPhase2Donations();
        assert.equal(ethBal.toString(), round1.plus(round2), 'Eth balance does not equal the summed donations');
    });

    function randTokAmount() {
        return Math.floor(Math.random() * 200);
    }

    // in order to select the deterministic amounts, change the mappings to map(e => [e[0], e[1]])
    const games = [
        {
            hash: '0xe2782aaa1c41ebdceae2480d44f187e42844fa0247347cc267a9d9ef13223fc1',
            boardState: '0x8ef0871532bb8041d3a89faf3eccbacfa44cc5c771291ecb6fd2a36cd054649e',
            players: [
                [ '0x4D99c88263Cd8454d911d949FeC484c7A2A68aCF', 4, randTokAmount() ],
                [ '0xbd9b7eE73fD2318266EB5690bC493f156d4AE5ae', 24, randTokAmount() ],
                [ '0xAB81a2bf25edEC96b05f42C8782905E8287B2D40', 13, randTokAmount() ],
            ].map(e => [ e[0], e[2] ]),
        },
        {
            hash: '0x79fd0138242bfddb57621dad2c84497f5cefe992318e44d400f847f7ce785f39',
            boardState: '0xfc96389c389faea4be295013c6d7a4bfc09e90a24ef6e754c99d6596c566c2b1',
            players: [
                [ '0xF91116942BF91433b76018e404Dd2A2B4007BB7E', 24, randTokAmount() ],
                [ '0x4E1Bf9D57d5ADCf8332f9Ab11f239317F1DEC042', 132, randTokAmount() ],
                [ '0xbd9b7eE73fD2318266EB5690bC493f156d4AE5ae', 38, randTokAmount() ], // address which already exists in first game
            ].map(e => [ e[0], e[2] ]),
        },
    ];

    it('Tokens are correctly generated and allocated to the pool', async () => {
        let tokensClaimed = 0;
        for (g of games) {
            const addresses = g.players.map(p => p[0]);
            const amounts = g.players.map(p => p[1]);
            tokensClaimed += amounts.reduce((sum, e) => sum + e);
            game.addGame(g.hash, g.boardState);
            game.distributeTokens(addresses, amounts);
        }
        // console.log(`total tokens claimed: ${tokensClaimed }`);
        const tokenSupply = web3.toDecimal(web3.fromWei(await token.totalSupply()));
        const poolBalance = web3.toDecimal(web3.fromWei(await token.balanceOf(pool.address)));

        assert.equal(tokensClaimed * 2, tokenSupply, 'token supply does not equal tokens claimed * 2');
        assert.equal(tokensClaimed, poolBalance, 'pool balance is not correct');
    });

    it('do not allow token withdrawal or Ether payout before donation rounds close', async () => {
        await pool.withdrawTokenShare({ from: donations.round1[0] }).should.be.rejected();
        await pool.payoutDonations(randomPrivacyOrg, { from: owner }).should.be.rejected();
    });

    it('tokens are distributed correctly', async () => {
        // first, allocate tokens to the pool
        // const totalTokens = 68099;
        // token.mint(P4PPool.address, totalTokens);
        const poolInitBal = await token.balanceOf(pool.address);

        // switching to payout state
        await pool.startNextPhase();

        let totalWithdrawn = new BigNumber(0);
        for (e of donations.round1.concat(donations.round2)) {
            const tokInitBal = await token.balanceOf(e[0]);  // eslint-disable-line
            await pool.withdrawTokenShare({ from: e[0] }); // eslint-disable-line
            const tokBal = await token.balanceOf(e[0]);  // eslint-disable-line
            // correctly handles multiple donations per user
            const tokAdded = tokBal.minus(tokInitBal);
            // bignumber complains about more than 15 digits, thus conversion to string
            // const fairShare = poolInitBal.times(e[1].toString()).dividedToIntegerBy(totalDonated.toString());
            // console.log(`${e[0]} added ${tokAdded.toString()}, fair share is ${ fairShare.toString()}`);
            // assert.equal(tokAdded, fairShare, `${e[0]} didn't receive her fair share`);
            totalWithdrawn = totalWithdrawn.plus(tokAdded);
        }

        const poolBal = await token.balanceOf(pool.address);
        const ownerTokenSharePct = await pool.ownerTokenSharePct();
        console.log(`ownerPct: ${ownerTokenSharePct}, poolInitBal: ${poolInitBal}, poolBalance: ${poolBal}, \
        totalWithdrawn: ${totalWithdrawn}`);
        await pool.withdrawTokenShare({ from: owner });
        const ownerTokBal = await token.balanceOf(owner);

        totalWithdrawn = totalWithdrawn.plus(ownerTokBal);
        const ownerFairShare = totalWithdrawn.times(ownerTokenSharePct).dividedToIntegerBy(100);
        // toNumber() removes precision, accounting for remainders. TODO: can we do better?
        assert.equal(ownerFairShare.toNumber(), ownerTokBal.toNumber(), 'owner did not receive the fair share');
        assert.equal(poolInitBal.toNumber(), totalWithdrawn.toNumber(), 'pool was not fully paid out');

        const poolEndBal = await token.balanceOf(pool.address);
        console.log(`finally remaining in pool: ${poolEndBal}`);

        // This check ensures that nomore than 500 token-wei's (however you name that) remain in pool.
        // TODO: this number is an arbitrary, heuristically determined choice. Could be done better
        assert.equal(Math.round(poolEndBal / 1000), 0, 'pool is not empty (enough)');
    });

    it('only owner can set donation receiver', async () => {
        await pool.setDonationReceiver(donationSplitter.address, {from: user1}).should.be.rejected();
        await pool.setDonationReceiver(donationSplitter.address, {from: owner});
        await pool.lockDonationReceiver({from: user1}).should.be.rejected();
        await pool.lockDonationReceiver({from: owner});
        await pool.setDonationReceiver(randomPrivacyOrg, {from: owner}).should.be.rejected();
    });

    it('pay out donations correctly', async () => {
        const initEthBal = await web3.eth.getBalance(pool.address);
        const recv1InitBal = await web3.eth.getBalance(splitterRecv1);
        const recv2InitBal = await web3.eth.getBalance(splitterRecv2);

        console.log(`initEthBal is ${initEthBal}`);
        await pool.payoutDonations({ from: user1 }).should.be.rejected();
        await pool.payoutDonations({ from: owner });

        await donationSplitter.payout({ from: user3 });
        await donationSplitter.payout({ from: user4 }); // repeated calling shouldn't cause any issues

        // console.log(`max addr is ${donationSplitter.max_schrems_addr()}`);
        const recv1DiffBal = new BigNumber(await web3.eth.getBalance(splitterRecv1)).minus(recv1InitBal);
        const recv2DiffBal = new BigNumber(await web3.eth.getBalance(splitterRecv2)).minus(recv2InitBal);

        console.log(`recv1DiffBal ${recv1DiffBal.toString()}`);
        console.log(`recv2DiffBal ${recv2DiffBal.toString()}`);

        // again, toNumber() removes enough precision to avoid mismatching division remainders
        console.log(`donation share (/2) is ${initEthBal / 2}`);
        assert.equal(initEthBal.toNumber() / 2, recv1DiffBal.toNumber(),
            'donations were not fully received by receiver 1');
        assert.equal(initEthBal.toNumber() / 2, recv2DiffBal.toNumber(),
            'donations were not fully received by receiver 2');
        //assert.equal(initEthBal.toString(), splitterRecv1Bal.plus(splitterRecv2Bal).toString(), 'donations were not fully received');
    });

    it('send some more to the donationSplitter', async () => {
        await donationSplitter.sendTransaction({ from: accounts[5], value: web3.toWei(1.283) });
        await donationSplitter.payout({ from: user2 });
    });

    it('destroy not (yet) callable', async () => {
        await pool.destroy({ from: owner }).should.be.rejected();
    });
});
