import { Arc } from '@daostack/client'
const graphqlHttpProvider: string = 'http://127.0.0.1:8000/subgraphs/name/daostack'
const graphqlWsProvider: string = 'ws://127.0.0.1:8001/subgraphs/name/daostack'
const web3HttpProvider: string = 'http://127.0.0.1:8545'
const web3WsProvider: string = 'ws://127.0.0.1:8545'

export const arc = new Arc({
  graphqlHttpProvider,
  graphqlWsProvider,
  web3HttpProvider,
  web3WsProvider
})