/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProgress = /* GraphQL */ `
  query GetProgress($id: ID!) {
    getProgress(id: $id) {
      id
      userID
      progress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProgresses = /* GraphQL */ `
  query ListProgresses(
    $filter: ModelProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        progress
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
