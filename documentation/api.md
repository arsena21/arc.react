# API

## Recommended Readings

We recommend reading the [architecture](architecture.md) & [examples](examples.md) before this document.

## Protocol Connection

First, you must connect to the Arc protocol using an [`ArcConfig`](https://github.com/arsena21/arc.react/tree/b197cb641f78188cc58f50eccd3df68369f03d5d/src/protocol/ArcConfig.ts) object like so:

```text
import { Arc, ArcConfig } from "@daostack/daocomponents";

const App = () => (
  <Arc config={new ArcConfig("rinkeby")}>All other components go here</Arc>
);
```

Supported networks:

* mainnet
* rinkeby
* kovan
* xdai
* private

In order to send transactions, you need to connect your `web3 provider`. Here's an example assuming Metamask in the browser:

```typescript
import { networkSettings } from "@daostack/arc.react";

// Get the default configuration settings for the
// active network (mainnet, kovan, private, etc)
let config = networkSettings["private"];

// Get the Metamask provider from the browser
const metamask =
  (window as any).ethereum.currentProvider ||
  (window as any).web3.currentProvider;

// Create the Arc config, which opens a connection to the protocol
const arcConfig = new ArcConfig({
  ...config,
  web3Provider: metamask,
});
arcConfig.initialize();
```

You can also pass in your own configuration values like so:

```typescript
import { ArcSettings } from "@daostack/arc.react";

const settings: ArcSettings = {
  graphqlHttpProvider: "...",
  graphqlWsProvider: "...",
  web3Provider: "...",
  ipfsProvider: "...",
};

const arcConfig = new ArcConfig(settings);
arcConfig.initialize();
```

## Components

You can use every class that is an entity \(a.k.a. extends from the Entity class in [Arc.js library](https://github.com/daostack/arc.js)\) as a react component.

```typescript
//Every component accepts the following props:
noSub: boolean;
```

The function of the `noSub` prop is that you can make that a component does not subscribes to changes \(of data on the chain\)

### DAO

```typescript
Props needed:

address: string // dao address
```

```markup
<DAO address='0x'>
  <DAO.Data>
    {(dao: DAOData) => <div> Name: {dao.name} </div>})
  <DAO.Data>
</DAO>
```

### Member

```typescript
Props needed without infer:

address: string; //member address
dao: string; //dao address
```

```markup
<Member address="0x" dao="0x">
  <Member.Data>
    {(member: MemberData) =>
    <div>Member: {member.address}</div>
    )}
  </Member.Data>
</Member>
```

```typescript
Props needed using infer:

address: string; //member address
```

```markup
<DAO>
  <Member address="0x">
    <Member.Data>
      {(member: MemberData) =>
      <div>Member: {member.address}</div>
      )}
    </Member.Data>
  </Member>
</DAO>
```

### Plugin

`<Plugin>` is a generic component, but you can also use the specific plugin you would like to use, you can check which one exists \[here\]\('../src/componenents/plugins\)

```typescript
Props needed:

id: string; // plugin id
```

```markup
<Plugin id="0x">
  <Plugin.Data>
    {(pluginInfo: PluginData) => <div> Plugin name: ${pluginInfo.name} </div> }
  </Plugin.Data>
  <Plugin.Entity>
    {(pluginEntity: PluginEntity) => (
      <button onClick={ async (e) => await pluginEntity.createProposal(...) }}>
        New proposal
      </button>
    ))}
  </Plugin.Entity>
 </Plugin>
```

Also, inferring the `Plugin` component:

```markup
<Plugin id="0x">
  <ReputationFromTokenPlugin>
    <ReputationFromTokenPlugin.Data>
      {(plugin: PluginData) => (
      <div>{"Plugin name: " + plugin.name}</div>
      )}
    </ReputationFromTokenPlugin.Data>
  </ReputationFromTokenPlugin>
</Plugin>
```

### Proposal

`<Proposal>` is like Plugin component, you can see the specifics proposal implemented \[here\]\('../src/componenents/plugins\) too, but you must go inside of the plugin folder to make sure the proposal type exists on that plugin

```typescript
Props needed

id: string; // proposal id
```

```markup
<Proposal id="0x">
  <Proposal.Data>
    {(proposal: ProposalData) => (
    <div>{"Proposal id: " + proposal.id}</div>
    )}
  </Proposal.Data>
</Proposal>
```

Also, inferring the `Proposal` component:

```markup
<Proposal id="0x">
  <ContributionRewardProposal>
    <ContributionRewardProposal.Data>
      {(proposal: ProposalData) => (
      <div>{"Proposal id: " + proposal.id}</div>
      )}
    </ContributionRewardProposal.Data>
  </ContributionRewardProposal>
</Proposal>
```

### Queue

```typescript
Props needed without infer

id: string; // queue id
dao: string; // dao address
```

```markup
<Queue dao="0x" id="0x">
  <Queue.Data>
    {(queue: QueueData) =>
    <div>{"Queue id: " + queue.id}</div>
    }
  </Queue.Data>
</Queue>
```

```typescript
Props needed using infer:

id: string; // queue id
```

```markup
<DAO>
  <Queue address="0x">
    <Queue.Data>
      {(member: QueueData) =>
      <div>Queue: {member.address}</div>
      )}
    </Queue.Data>
  </Queue>
</DAO>
```

### Reputation

```typescript
Props needed

address: string; // reputation address
```

```markup
<Reputation address="0x">
  <Reputation.Data>
    {(reputation: ReputationData) => (
    <div>{"Reputation address: " + reputation.address}</div>
    )}
  </Reputation.Data>
</Reputation>
```

### Reward

```typescript
Props needed

id: string // reward id
```

```markup
<Reward id="0x">
  <Reward.Data>
    {(reward: RewardData) =>
    <div>{"Reward id: " + reward.id}</div>
    }
  </Reward.Data>
</Reward>
```

### Stake

```typescript
Props needed

id: string // stake id
```

```markup
<Stake id="0x">
  <Stake.Data>
    {( stake: StakeData) =>
    <div>{"Stake id: " + stake.id}</div>
    }
  </Stake.Data>
</Stake>
```

### Tag

```typescript
Props needed:

id: string; //plugin id
```

```markup
<Tag>
  <Tag.Data>
    {( tag: TagData) =>
    <div>{"Tag id: " + tag.id}</div>
    }
  </Tag.Data>
</Tag>
```

### Token

```typescript
Props needed using without infer:

address: string; //token address
```

```markup
<Token address="0x">
  <Token.Data>
    {(token: TokenData) => (
    <div>{ "Token DAO owner: " + token.owner }</div>
    )}
  </Token.Data>
</Token>
```

```typescript
Props needed using infer: None
```

```markup
<Token>
  <Token.Data>
    {(token: TokenData) => (
    <div>{"Token DAO owner: " + token.owner}</div>
    )}
  </Token.Data>
</Token>
```

### Vote

```typescript
Props needed using infer:
id: string // vote id
```

```markup
<Vote id="0x">
  <Vote.Data>
    {(vote: VoteData) =>
    <div>{"Vote id: " + vote.id}</div>
    }
  </Vote.Data>
</Vote>
```

## Component Lists

When you use a component that ends with `s`, you can show a list of every entity that exists, but also, you can get the sub-entities from a top level entity.

For example, member has votes, so you can see all the votes that a specific member has done, using the `from` props, like this:

```markup
<Member address="0x">
  <Votes from="Member as voter">
    <Vote.Data>
      {(vote: VoteData) =>
      <div>{"Vote id: " + vote.id}</div>
      }
    </Vote.Data>
  </Votes> </Member
>>
```

Here is a list of the components that extends from `ComponentBase`, that have an implementation of the `from` props

### Members

```typescript
from?: "DAO"
```

```markup
<DAO address="0x">
  <Members from="DAO">
    <Member.Data>
      ({ member: MemberData) =>
      <div>{ "Member address: " + member.address}</div>
      })
    </Member.Data>
  </Members>
</DAO>
```

### Queues

```typescript
from?: "DAO"
```

```markup
<DAO address="0x">
  <Queues from="DAO">
    <Queue.Data>
      ({ queue: QueueData) =>
      <div>{ "Queue id: " + queue.id}</div>
      })
    </Queue.Data>
  </Queues>
</DAO>
```

### Rewards

```typescript
from: "DAO" | "Member as beneficiary" | "Proposal" | "Token";
```

```markup
<Member address="0x">
  <Rewards from="Member as beneficiary">
    <Reward.Data>
      ({ reward: RewardData) =>
      <div>{ "Reward id: " + reward.id}</div>
      })
    </Reward.Data>
  </Rewards>
</Member>
```

### Stakes

```typescript
from: "DAO" | "Member as staker" | "Proposal";
```

```markup
<Proposal id="0x">
  <Stakes from="Proposal">
    <Stake.Data>
      ({ Stake: StakeData) =>
      <div>{ "Stake id: " + Stake.id}</div>
      })
    </Stake.Data>
  </Stakes>
</Proposal>
```

### Votes

```typescript
from: "DAO" | "Member as voter" | "Proposal";
```

```markup
<Proposal id="0x">
  <Votes from="Proposal">
    <Vote.Data>
      {(vote: VoteData) => <div>{"Vote id: " + vote.id}</div>}
    </Vote.Data>
  <Votes />
</Proposal>
```

### Plugins

```typescript
from?: "DAO"
```

```markup
<DAO address="0x">
  <Plugins from="DAO">
    <Plugin.Data>
      ({ plugin: PluginData ) =>
      <div>{ "Plugin id: " + plugin.id}</div>
      })
    </Plugin.Data>
  </Plugins>
</DAO>
```

### Proposals

```typescript
from?: "DAO" | "Member as proposer"
```

```markup
<Member address="0x">
  <Proposals from="Member as proposer">
    <Proposal.Data>
      {(proposal: ProposalData) => <div>{"Proposal id: " + proposal.id}</div>}
    </Proposal.Data>
  <Proposals />
</Member>
```

## useComponent

As you previously saw, to get the information \(`Data` and `Entity`\) from every component we need to do, for example with Member:

```markup
<Member address="0x" dao="0x">
  <Member.Data>
    {(member: MemberData) =>
    <div>{"Member id: " + member.id}</div>
    }
  </Member.Data>
</Member>
```

But the library also allows you to do, \(this is available for every component of the library\):

```jsx
const MyMemberComponent = () => {
  const [memberData, memberEntity] = useMember();
  return <div>Member id: {memberData?.id}</div>;
};
<Member address="0x" dao="0x">
  <MyMemberComponent />
</Member>;
```

Note that you MUST implement the component that has the `useXXX` INSIDE of the component you want to get the data and/or from. Also, you must use the `?` when interacting with the hook because it can be undefined.

[Click here](https://github.com/dOrgTech/arc.react-demo/blob/dev/src/components/Proposals/Create.tsx#L20) to check an example

