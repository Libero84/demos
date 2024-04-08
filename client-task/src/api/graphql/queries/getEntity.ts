import { gql } from "@apollo/client";

export const GET_ENTITY = gql`
    query GetEntity($getEntityId: ID!) {
    getEntity(id: $getEntityId) {
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