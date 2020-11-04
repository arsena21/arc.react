# Querying the Subgraph

The full list of Subgraph Entities cached by DAOstack subgraph can be found [here](https://subgraph.daostack.io/). You can find all of the subgraph entities [here](https://github.com/daostack/DAOstack-Hackers-Kit/blob/master/docs/stack/subgraph/entities.md%20).

## Query for single Entity

When you query for single Entity with all/some fields, you need to provide the Entity id.

Details of Genesis DAO `0x294f999356ed03347c7a23bcbcf8d33fa41dc830`

```text
query {
  dao (id: "0x294f999356ed03347c7a23bcbcf8d33fa41dc830") {
    name
    numberOfQueuedProposals
    numberOfBoostedProposals
    numberOfPreBoostedProposals
    proposals{
      title
    }
    reputationHoldersCount
  }
}
```

Details of Proposal `0x0025c38d987acba1f1d446d3690384327ebe06d15f1fa4171a4dc3467f8bd416`

```text
query {
  proposal (id: "0x0025c38d987acba1f1d446d3690384327ebe06d15f1fa4171a4dc3467f8bd416") {
    proposer
    createdAt
    expiresInQueueAt
    title
    votesFor
    votesAgainst
    dao {
      id
      name
    }
  }
}
```

## Query for Multiple Entities

### Query all

Just change the entity name to plural to query for all the entities of that type

_Examples_ 

Details of all \`daos\` indexed by the DAOstack subgraph 

```text
query {
  daos{
    name
    id
    reputationHoldersCount
    proposals{
      id
      title
    }
  }
}
```

Details of all \`Reputation Holders\` in DAOstack DAOs

```text
query {
  reputationHolders {
    id
    address
    balance
    dao{
      name
    }
  }
}
```

### Filter by fields

To query for a subset of Entities you can add `where: {}` parameter to filter for different properties. You can filter for single or multiple properties.

#### **Filter top level entity**

_Examples_ 

To get all proposals submitted on 2019 Halloween, we can filter for the time interval on \`createdAt\` property

```text
query {
  proposals (
    where : {
      createdAt_gt: 1572480000,
      createdAt_lt: 1572566400
    }
  ) {
    id
  	title
    dao {
      name
    }
  }
}
```

 Get all \`daos\` with more than 200 reputation holders

```text
query {
  daos (
    where: {
      reputationHoldersCount_gt: 200
  }) {
    name
    reputationHoldersCount
  }
}
```

 Genesis DAO proposals that contains word 'Reputation' in title

```text
query {
  proposals (
    where: {
      dao: "0x294f999356ed03347c7a23bcbcf8d33fa41dc830"
      title_contains: "Reputation"
    }
  ){
    title
    dao{
      name
    }
  }
}
```

#### **Filter complex subfield array**

_Examples_ 

Get rewards detail for all DAO where 250 GEN or more were awarded in DAO bounty

```text
query { 
  daos {
    name
		rewards (
      where: {
        daoBountyForStaker_gte: "250000000000000000000"
      }
    ){
      proposal {
        id
      }
      daoBountyForStaker
    }
  }
}
```

NOTE:

* The suffix `_contains` in the above example is used for the comparison
* Some suffixes are only supported for specific types. For example, Boolean only supports `_not`, `_in`, and `_not_in`.
*  Complete list of suffix is `_not` `_gt` `_lt` `_gte` `_lte` `_in` `_not_in` `_contains` `_not_contains` `_starts_with` `_ends_with` `_not_starts_with` `_not_ends_with`

### Sort by field values

#### **Sort top level entity**

_Examples_

To query for a sorted list you can add `orderBy` parameter to sort by a specific property. Also, you can specify the direction of sort `asc` for ascending and `desc` for descending. 

Sort Reputation Holders by their reputation balance 

```text
query {
  reputationHolders(
    orderBy: balance,
    orderDirection: desc
  ){
    address
    balance
  }
}
```

Sort DAOs by number of boosted proposals it has

```text
query {
  daos (
    orderBy: numberOfBoostedProposals,
    orderDirection: asc
  ) {
    name
    numberOfBoostedProposals
  }
}
```

**Sort complex subfield array**

_Examples_ 

Get all proposals from all the daos ordered by the date of submission

```text
query { 
  daos {
  	proposals (
      orderBy: createdAt,
      orderDirection: desc
    ){
      title
    }
  }
}
```

### Paginate

You can also decrease the size of set queried by specifying the pagination limit

_Examples_

**From the beginning**

Get first 3 DAOs based on highest number of reputation holders

```text
query{
  daos (
    first: 3
    orderBy: reputationHoldersCount
    orderDirection: desc
  ) {
    name
    numberOfBoostedProposals
  }
}
```

**From the middle**

 Get all DAOs except the first 5 

```text
query{
  daos (
    skip: 5
    orderBy: reputationHoldersCount
    orderDirection: desc
  ) {
    name
    numberOfBoostedProposals
  }
}
```

Get the next 3 DAOs after the top 3

```text
query {
  daos (
    skip: 3
    first: 3
    orderBy: reputationHoldersCount
    orderDirection: desc
  ) {

    You
  	name
 		reputationHoldersCount
	}
}
```

