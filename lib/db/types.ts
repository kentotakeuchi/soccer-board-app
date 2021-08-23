export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  createPlayer: Player
  updatePlayer?: Maybe<Player>
}

export type MutationCreatePlayerArgs = {
  data: PlayerInput
}

export type MutationUpdatePlayerArgs = {
  playerId: Scalars['ID']
  data: PlayerInput
}

export type Player = {
  playerId: Scalars['ID']
  name: Scalars['String']
  photo: Scalars['String']
}

export type PlayerInput = {
  name?: Maybe<Scalars['String']>
  photo?: Maybe<Scalars['String']>
}

export type Query = {
  allPlayers: Array<Player>
  player?: Maybe<Player>
}

export type QueryPlayerArgs = {
  playerId: Scalars['ID']
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

import { ObjectID } from 'mongodb'
export type PlayerDbObject = {
  _id: ObjectID
  name: string
  photo: string
}
