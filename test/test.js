const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');
  
const Voting = artifacts.require("./Voting.sol");

const expect = require('chai').expect;

contract("Voting", accounts => {

  /// create owner + some other accounts 
  const owner = accounts[0];
  const address1 = accounts[1];
  const address2 = accounts[2];
  const address3 = accounts[3];

  let VotingInstance;

  /// Testing registration - AddVoter
  describe("Testing registration - addVoter", function () {

    // Deploy a new fresh contract for each test
    beforeEach(async function () {
        VotingInstance = await Voting.deployed({from: owner});
    });

    /// Only owner can use addVoter(), the error message comes from openzepplin library
    it('Check addVoter is only for Owner', async function() {
      await expectRevert(VotingInstance.addVoter(address1, {from: address1}), 'caller is not the owner');
    });

    /// Check event "VoterRegistered" is correctly generated 
    it("Checking event : VoterRegistered", async () => {
      const result = await VotingInstance.addVoter(address1);
      expectEvent(result, "VoterRegistered", { voterAddress: address1 });
    });

    /// Happy flow : check everything is successful - isRegistered flag is set & event "VoterRegistered"
    it("Add a Voter - happy flow", async function() {
      const result = await VotingInstance.addVoter(address2, { from: owner });
      voterStruct = await VotingInstance.getVoter(address2, { from: address2 });
      /// check isRegistered flag 
      expect(voterStruct.isRegistered).to.equal(true);
      /// check event 
      expectEvent(result, "VoterRegistered", { voterAddress: address2 });
    });
    it('cannot add a voter if session if status is incorrect', async function() {
      await VotingInstance.startProposalsRegistering({from: owner});
      await expectRevert(VotingInstance.addVoter(address3, {from: owner}), 'Voters registration is not open yet');
    });
  });

  /// Testing PROPOSAL 
  describe("Testing - addProposal", function () {

    // Deploy a new fresh contract for each test
    beforeEach(async function () {
      VotingInstance = await Voting.new({from: owner});
      const result = await VotingInstance.addVoter(address1, { from: owner });
    });

    it('Add a new proposal', async function() {
      await VotingInstance.startProposalsRegistering({from: owner});
      let result = await VotingInstance.addProposal('A new super proposal', {from: address1});

      /// check event "ProposalRegistered" emitted with index 0 
      await expectEvent(result, "ProposalRegistered", 0);
    });

    it('Proposal can not be empty', async function() {
      await VotingInstance.startProposalsRegistering({from: owner});
      await expectRevert(VotingInstance.addProposal('', {from: address1}), "Vous ne pouvez pas ne rien proposer");
    });

    /// Only a Voter (with addVoter()) can vote ...
    it('Check addProposal can only be used by a voter', async function() {
      await expectRevert(VotingInstance.addProposal('A new super proposal', {from: address3}), "You're not a voter");
    });
  });

  /// More testing here ... it takes a lot of time to get everything working ;-)

});