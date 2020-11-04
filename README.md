# README

DAOstack provides everything you need to start decentralizing your project or community.  **V1 of our stack is our stable version. V2 of our stack is a more experimental branch that has many advantages from a usability and developer perspective. The documentation is organized by these two versions.** 

## Arc.react

Here are the most important things you should know about if you aren’t familiar:

> [Arc.react](https://github.com/daostack/arc.react) componentizes [DAOstack's Arc.js library](https://github.com/daostack/arc.js), enabling easier React application integration.

**Turn any React app into a DAO enabled dApp in just:**

* Voting power within our DAOs are reputation based \(REP for short\), making them incredibly flexible, and more resistant to certain kinds of ****attacks. Voting power can be given via proposals, or through some other group like token holders if you want. 
* DAOs on our platform have a native token which they can mint via proposals \(which you don’t need to use if you don’t want to, but comes in handy for many projects!\) 
* DAOs on our platform start off with very basic features. Plugins can be added to this basic DAO which expands its capabilities.
* DAOstack DAOs use Holographic Consensus, which is a voting system with advantages over other kinds of voting mechanisms. You can read more on this here.

Some of the most well known DAOs on our platform include [DXdao](https://dxdao.eth.link/), [NecDAO](https://nectar.community/dao) and [PrimeDAO](https://ipfs.io/ipfs/QmabBvci27gFn3C9wWzS6k2jBRCLnAHUvfwSDhZ8iZkADB/#/). You can always reach out to us on either Telegram and Discord if you have any questions about your DAO related efforts. [DAOtalk](https://daotalk.org/) is also a great place to get answers.

1...

  


```bash
npm i --save @daostack/arc.react`
```

2...

```markup
<Arc config={new ArcConfig("rinkeby")}>
```

3...

```markup
<DAO address="0xMY_DAO"></DAO>
```

**Enabling you to build custom interfaces for displaying and interacting with your DAO's:**

members...

```markup
<Members>
  <Member.Data>
    {(data: MemberData) => (
    <div>{data.address}</div>
    )}
  </Member.Data>
</Members>
```

proposals...

```markup
<Proposals>
  <Proposal.Data>
  <Proposal.Entity>
  {(data: ProposalData, entity: ProposalEntity) => (
    <div>
      <h1>{data.title}</h1>
      <button onClick={() => entity.vote({...})}>
        Up Vote
      </button>
      <button onClick={() => entity.vote({...})}>
        Down Vote
      </button>
    </div>
  )}
  </Proposal.Entity>
  </Proposal.Data>
</Proposals>
```

**and any other entity** [**within the DAOstack protocol**](https://github.com/arsena21/arc.react/tree/b197cb641f78188cc58f50eccd3df68369f03d5d/src/components/README.md)**!**

### Read The Docs

* [examples](documentation/examples.md)
* [architecture](documentation/architecture.md)
* [api](documentation/api.md)

Check the [demo app!](https://github.com/dOrgTech/arc.react-demo)

## Build & Contribute

### Prerequisites

* nvm
* docker
* docker-compose

### Running Playground

> `nvm install`  
> `nvm use`  
> `yarn`  
> `yarn start`

### Testing

> `yarn start:subgraph`  
> `yarn test`

