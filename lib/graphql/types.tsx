import { GraphQLResolveInfo } from 'graphql'
import { gql } from '@apollo/client'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {}
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Player: ResolverTypeWrapper<Player>
  String: ResolverTypeWrapper<Scalars['String']>
  PlayerInput: PlayerInput
  Query: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {}
  ID: Scalars['ID']
  Player: Player
  String: Scalars['String']
  PlayerInput: PlayerInput
  Query: {}
  Boolean: Scalars['Boolean']
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createPlayer?: Resolver<
    ResolversTypes['Player'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePlayerArgs, 'data'>
  >
  updatePlayer?: Resolver<
    Maybe<ResolversTypes['Player']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePlayerArgs, 'playerId' | 'data'>
  >
}

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']
> = {
  playerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  photo?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allPlayers?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>
  player?: Resolver<
    Maybe<ResolversTypes['Player']>,
    ParentType,
    ContextType,
    RequireFields<QueryPlayerArgs, 'playerId'>
  >
}

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>
  Player?: PlayerResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

export type PlayerQueryVariables = Exact<{
  playerId: Scalars['ID']
}>

export type PlayerQuery = { player?: Maybe<{ name: string; photo: string }> }

export type UpdatePlayerMutationVariables = Exact<{
  playerId: Scalars['ID']
  data: PlayerInput
}>

export type UpdatePlayerMutation = { updatePlayer?: Maybe<{ name: string; photo: string }> }

export type AllPlayersQueryVariables = Exact<{ [key: string]: never }>

export type AllPlayersQuery = { allPlayers: Array<{ playerId: string }> }

export type CreatePlayerMutationVariables = Exact<{
  data: PlayerInput
}>

export type CreatePlayerMutation = { createPlayer: { playerId: string } }

export const PlayerDocument = gql`
  query Player($playerId: ID!) {
    player(playerId: $playerId) {
      name
      photo
    }
  }
`

/**
 * __usePlayerQuery__
 *
 * To run a query within a React component, call `usePlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerQuery({
 *   variables: {
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function usePlayerQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<PlayerQuery, PlayerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, options)
}
export function usePlayerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlayerQuery, PlayerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, options)
}
export type PlayerQueryHookResult = ReturnType<typeof usePlayerQuery>
export type PlayerLazyQueryHookResult = ReturnType<typeof usePlayerLazyQuery>
export type PlayerQueryResult = ApolloReactCommon.QueryResult<PlayerQuery, PlayerQueryVariables>
export const UpdatePlayerDocument = gql`
  mutation updatePlayer($playerId: ID!, $data: PlayerInput!) {
    updatePlayer(playerId: $playerId, data: $data) {
      name
      photo
    }
  }
`
export type UpdatePlayerMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePlayerMutation,
  UpdatePlayerMutationVariables
>

/**
 * __useUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMutation, { data, loading, error }] = useUpdatePlayerMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePlayerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePlayerMutation,
    UpdatePlayerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<UpdatePlayerMutation, UpdatePlayerMutationVariables>(
    UpdatePlayerDocument,
    options
  )
}
export type UpdatePlayerMutationHookResult = ReturnType<typeof useUpdatePlayerMutation>
export type UpdatePlayerMutationResult = ApolloReactCommon.MutationResult<UpdatePlayerMutation>
export type UpdatePlayerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePlayerMutation,
  UpdatePlayerMutationVariables
>
export const AllPlayersDocument = gql`
  query allPlayers {
    allPlayers {
      playerId
    }
  }
`

/**
 * __useAllPlayersQuery__
 *
 * To run a query within a React component, call `useAllPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPlayersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<AllPlayersQuery, AllPlayersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<AllPlayersQuery, AllPlayersQueryVariables>(
    AllPlayersDocument,
    options
  )
}
export function useAllPlayersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPlayersQuery, AllPlayersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<AllPlayersQuery, AllPlayersQueryVariables>(
    AllPlayersDocument,
    options
  )
}
export type AllPlayersQueryHookResult = ReturnType<typeof useAllPlayersQuery>
export type AllPlayersLazyQueryHookResult = ReturnType<typeof useAllPlayersLazyQuery>
export type AllPlayersQueryResult = ApolloReactCommon.QueryResult<
  AllPlayersQuery,
  AllPlayersQueryVariables
>
export const CreatePlayerDocument = gql`
  mutation createPlayer($data: PlayerInput!) {
    createPlayer(data: $data) {
      playerId
    }
  }
`
export type CreatePlayerMutationFn = ApolloReactCommon.MutationFunction<
  CreatePlayerMutation,
  CreatePlayerMutationVariables
>

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlayerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePlayerMutation,
    CreatePlayerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(
    CreatePlayerDocument,
    options
  )
}
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>
export type CreatePlayerMutationResult = ApolloReactCommon.MutationResult<CreatePlayerMutation>
export type CreatePlayerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePlayerMutation,
  CreatePlayerMutationVariables
>
