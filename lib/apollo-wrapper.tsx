'use client'

import type { ReactNode } from 'react'
import { ApolloLink, HttpLink, split } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://your-graphql-server.com/graphql',
  })

  const wsLink
    = typeof window !== 'undefined'
      ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:8000/ws',
        }),
      )
      : null

  const splitLink
    = typeof window !== 'undefined' && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition'
              && definition.operation === 'subscription'
            )
          },
          wsLink,
          httpLink,
        )
      : httpLink

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : splitLink,
  })
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
