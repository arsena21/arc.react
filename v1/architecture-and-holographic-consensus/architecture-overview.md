# Architecture Overview

Below is a high level diagram of the DAOstack architecture:

![](https://lh5.googleusercontent.com/eq4m6RMflA-_Zrw8JdEla-Yx47WLd60KepbsNzPJy8bWxudQHgtOFcuoBlquYAZpsun5_ytjlEXCzrITChWBxeC5IdNSYt_1rMOcJZhoRF3G7DKLZF1I8eQq1anybfpQbGaY2IdS)

The main components of our stack include:

* Smart contracts and information stored on the Ethereum blockchain \(Infra, Arc\)
* A caching layer \(Subgraph\) which allows fast access to the blockchain layer
* Javascript library \(Arc.js\) and APIs used for application layer integrations.

## Infra

[Infra](https://github.com/daostack/infra) is a Solidity smart contract library containing the core building blocks of our protocol. It has two main components:

* Voting Machines - A voting machine is a universal contract which can operate the voting process for any organization. Each voting machine follows its own predefined rules for the decision making and execution process. Rules for voting machines can be implemented for any voting process, from a simple protocol like an absolute majority vote \(where 51% of the voting power should approve it in order for the decision to pass\), or more sophisticated protocols like the [Holographic Consensus](https://www.youtube.com/watch?v=1De0MoStSkY) voting protocol. All DAOs on DAOstack are currently using Holographic Consensus.
* Voting Rights Management - A voting rights management system determines how voting rights are distributed. Any voting rights management system must have "balances" which represents the voting power each participant holds. Currently, DAOs on DAOstack use reputation based voting rights. Reputation can be minted / burned via proposals, or it can be issued to people according to some other mechanisms \(like the number of tokens locked in an interface, like what [NecDAO](http://stake.nectar.community) did\).

Although we encourage and would love contributions at this layer of the stack, most developers don’t dig this deep. If you do want to create a new Voting Machine or Voting Rights Management system, contact us and we can point you in the right direction!

## Arc

[Arc](https://github.com/daostack/arc) is a solidity smart contract library for building DAOs. It uses Infra to provide decentralized organizations with voting machines and voting rights management. DAOs built with Arc have a few basic contract components:

* Avatar: The DAO's "account". This contract represents the address of the DAO and holds its assets.
* Reputation: Voting in Arc is done mainly using Reputation. Reputation can be distributed and redistributed only by DAO decision \(or via flexible Plugins, like a token locking plugin, which are approved by DAO decision\).
* Token: Each DAO has its own native token, which can be used in a variety of different ways \(for example, paying DAO members, or designing incentives\). The DAO can mint this token and issue it to members via proposals.
* Controller: Is the "Access Control" of the DAO, managing who can interact with which DAO functions and enforcing the DAO's constraints.
* Plugins: Plugins give DAOs superpowers. They might be used to help a DAO propose and make a trade on Uniswap, give reputation to agents, upgrade the DAO's contracts, register new plugins and constraints, etc.
* Global Constraints: Are limitations on a DAO's actions they take via Plugins. When executing actions, the Controller checks Constraints to see if the action violates them, and blocks the execution if it does. Some examples for constraints might be: the token supply can't be increased over 1M tokens, the organization won't use more than 60% of its funds at once, etc.

Arc utilizes the concept of "Universal" contracts: contracts which are deployed once, and then can be used by any number of DAOs simultaneously, saving gas and deployment costs. Schemes and constraints can both be used in this way. To use the already deployed contracts, you can either use Client, which maintains easy access to all universal Arc contracts, or you can use [Migration.json](https://github.com/daostack/migration/blob/master/migration.json) to view the addresses of the universal contracts of the latest arc version on the mainnet, Kovan, Rinkeby and Ganache\* All contracts listed in the file are universal, meaning that users should use them when needed and not redeploy them.

_\* Please note that the Ganache addresses are based on the DAOstack commands for running and deploying Arc to a local Ganache network, which means those addresses might change if you are using a different method to run Ganache or deploy Arc._

#### Should I work at this level?

Using Arc is not necessary to deploy a DAO, but you might want to work on this layer if you need your DAO to have a unique action, constraint, or voting process that is not yet implemented on Arc.

You can find the complete Arc docs here: [https://daostack.github.io/arc](https://daostack.github.io/arc)

## Subgraph

[Subgraph](https://github.com/daostack/subgraph) indexes the blockchain data and stores it in postgres database for easy and quick access. The subgraph runs on a Graph Node which is a server that developers can run local or remote. The data store can be queried by GraphQL endpoints. [DAOstack subgraph](https://subgraph.daostack.io/) is based on graphprotocol, checkout [The Graph documentation](https://thegraph.com/docs/quick-start) for more details. The Graph opens their server to others and you can find [daostack subgraph](https://thegraph.com/explorer/subgraph/daostack/master) in the Graph Explorer.

You can use GraphQL queries to get quick info from DAOstack Subgraph hosted on GraphExplorer. See [this guide](../querying-the-subgraph.md) on how to use GraphQL queries to get single or multiple Entities and sort, filter and paginate them.

The full list of Subgraph Entities cached by DAOstack subgraph can be found [here](https://subgraph.daostack.io/). You can find all of the subgraph entities [here](https://github.com/daostack/DAOstack-Hackers-Kit/blob/master/docs/stack/subgraph/entities.md%20).

#### Should I work at this level?

If you are writing new Arc contracts which are not indexed by DAOstack subgraph or want to fetch data of existing Arc contracts in a way other than that specified in [DAOstack subgraph's schema.graphql](https://github.com/daostack/subgraph/blob/master/src), then you should write your own subgraph schema and mappings

## Dapps

DAOstack has built its own dApp called [Alchemy](https://alchemy.do/), a front-end interface for DAOs. Another example of a dApp built on DAOstack includes [Common.io](https://common.io/). For those looking to incorporate a DAO in their own application, see [our section](../deploying-a-dao-in-your-own-ui.md) explaining Arc.js.

