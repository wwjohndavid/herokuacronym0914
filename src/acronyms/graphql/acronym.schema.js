import { gql } from 'apollo-server';

const getFields = `
    acronym: String
    definition: String
`;

export const updateFields = `
    acronym: String
    updateAcronym: String
    updateDefinition: String
`;
export const removeFields = `
    acronym: String
`;
export default gql`
    type Acronym {
        ${getFields}
    }

    type Query {
        acronyms: [Acronym]
    }

    
    type Mutation {
        addAcronym(${getFields}): Acronym
        updateAcronym(${updateFields}): Acronym
        removeAcronym(${removeFields}): Acronym

    }

`;
