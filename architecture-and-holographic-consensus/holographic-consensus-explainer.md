# Holographic Consensus Explainer

## Holographic Consensus Explainer

Genesis Protocol is a voting machine implemented by the DAOstack team called Holographic Consensus for scaling decisions within decentralized organizations. You can find details on our design principles [here](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c), as well as an explainer video by Matan Field [here](https://www.youtube.com/watch?v=1De0MoStSkY&ab_channel=DappConBerlin). 

### Quick Overview

Proposals are submitted to the DAO. Once submitted, they are “Regular” proposals that require an absolute majority \(&gt;50%\) of votes to pass, which is really hard!

Each proposal in Holographic Consensus has a prediction market associated with it. This prediction market uses the GEN token, and is the main utility of this token. By default, the DAO stakes GEN against every proposal passing, which provides an economic reward for each proposal. Members from the DAO or from the general public can stake on proposals they think will pass or fail, and get rewarded for their prediction. 

Proposals with predictions of passing \(above a certain threshold\) only require a relative majority to pass, which is much easier. 

### Proposal States

An open proposal \(i.e. with a pending decision\) can be in one of the following stages:

* Queued: All proposals, when submitted, are in a queued state by default and have a downstake \(funded by the DAO\) set  by the minimumDaoBounty parameter. The proposal requires an absolute majority \(i.e. &gt; 50% vote\) to pass in this state.
* PreBoosted: Once the stakes in favor of the proposal crosses the required  boosting threshold\*, it moves from queued to preboosted state. Note that this boosting threshold can be fixed, or it can increase as the number of boosted proposals increase \(explained at the end of this section\). The proposal in this state is open for staking and can be moved back to queued state if the stake against it increases and proposals crosses back below the boosting threshold. 
* Boosted: Once the proposal has been in preboosted state for period set by the preBoostedVotePeriodLimit parameter, the proposal moves to boosted state. The proposal in this state requires a relative majority to pass \(i.e votes\(For\) &gt; votes\(Against\)\). A proposal in this state is open for voting but cannot be staked on. Thus, once a proposal is boosted it cannot be moved back to queued or preboosted state. The proposal stays in this state until boostedVotePeriodLimit elapses.
* QuietEndingPeriod: If the winning outcome of the proposal flips from 'pass' to 'fail' or vice-versa during the final period of time decided by the quietEndingPeriod parameter, then the proposal voting time gets extended by quietEndingPeriod until the above condition is true.

\*A proposal is boosted if the following is true:  
stakes\(For\)/stakes\(Against\) &gt; \(thresholdConst\)^\(\#already-boosted-proposals\)

Note that thresholdConst can be 1, in which case you only need stakes\(For\) &gt; stakes\(Against\).

### Staking & Rewards

The following are the possible outcomes of a proposal:

* The proposal expires in queue without any decision: In this case all the stakes are returned to the respective staker.
* The proposal passes: Staker\(stake\(for\) amount\)\*daoBounty/\(total winning stake\)
* The proposal fails: Losing stake is lost

Note that for a given proposal, one can stake multiple times from the same address. In such a case all the subsequent stakes must align with the previous stake's vote i.e. if staked in favor of the proposal earlier you must stake in favor of the proposal in subsequent stakes.

### Parameters

Each DAO can set the following Genesis Protocol parameters when deploying a DAO. In many cases, DAOs will opt to simplify the parameters to keep things simple. Contact us if you need help in this selection process.

* Address: The Ethereum address where these parameters are stored \(not where the protocol itself is\). Example: 0x332b8c9734b4097de50f302f7d9f273ffdb45b84
* Activation Time \(activationTime\): The date and time \(represented in Unix time\) when proposals in this plugin can first be submitted. Example: 12:00 PM UTC on July 14th, 2019 \(active\)
* Boosted Vote Period Limit \(boostedVotePeriodLimit\): The length of time boosted proposals are open for voting. Example: 7 days \(604800 seconds\)
* Proposal Reputation Reward \(?\): The amount of voting power given out as a reward for submitting a proposal that the DAO passes. Example: 500 REP
* Minimum DAO Bounty \(minimumDaoBounty\): The minimum amount of GEN a DAO will stake when automatically downstaking each proposal. Example: 250 GEN
* Queued Vote Period Limit \(queuedVotePeriodLimit\): The length of time that voting is open for non-boosted proposals. Example: 45 days \(3888000 seconds\)
* Queued Vote Required \(queuedVoteRequiredPercentage\): The quorum required to decide a vote on a non-boosted proposal. By default, this is 50%. 
* Quiet Ending Period \(quietEndingPeriod\): The length of time a vote’s potential result needs to stay the same in order to be confirmed as the official result \(if there is a vote flip within this period of time, additional time is added to the proposal, to prevent a last minute attack\). Example: 2 days \(172800 seconds\)
* Proposal Reputation Reward \(proposingRepReward\): The amount of voting power given out as a reward for submitting a proposal that the DAO passes. Example: 500 REP
* Pre-Boosted Vote Period Limit \(preBoostedVotePeriodLimit\): The length of time that a proposal must maintain stakes\(For\)/stakes\(Against\) larger than the boosting threshold to become eligible for boosting. Example: 1 day \(86400 seconds\)
* Voters Reputation Loss Ratio \(votersReputationLossRatio\): The percentage of a voter’s voting power they stand to lose if they vote against the DAO’s eventual decision on a non-boosted proposal. In many cases, this is set to 0.
* voteOnBehalf:
* Threshold Constant \(thresholdConst\): Controls how quickly the ratio of stakes\(For\)/stakes\(Against\) for boosting goes up as the number of currently boosted proposals rises. In many cases, this will be set to 1, in which case you only need stakes\(For\) &gt; stakes\(Against\)
* DAO Bounty Constant \(daoBountyConst\): This is multiplied by the average downstake on boosted proposals to calculate how large the DAO’s automatic downstake should be. Example: 10

