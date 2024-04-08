import { gql } from "@apollo/client";

export const UPDATE_ENTITY = gql`
    mutation UpdateEntity($input: UpdateEntityInput) {
        updateEntity(input: $input) {
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