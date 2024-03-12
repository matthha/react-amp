/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProgress = /* GraphQL */ `
  subscription OnCreateProgress($filter: ModelSubscriptionProgressFilterInput) {
    onCreateProgress(filter: $filter) {
      id
      userID
      progress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProgress = /* GraphQL */ `
  subscription OnUpdateProgress($filter: ModelSubscriptionProgressFilterInput) {
    onUpdateProgress(filter: $filter) {
      id
      userID
      progress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProgress = /* GraphQL */ `
  subscription OnDeleteProgress($filter: ModelSubscriptionProgressFilterInput) {
    onDeleteProgress(filter: $filter) {
      id
      userID
      progress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
