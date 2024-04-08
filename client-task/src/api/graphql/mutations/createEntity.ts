import { gql } from "@apollo/client";

export const CREATE_ENTITY = gql`
mutation CreateEntity($input: CreateEntityInput) {
    createEntity(input: $input) {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        contactEmail
        industry
      }
    }
  }
`;