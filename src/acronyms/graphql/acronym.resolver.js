import { acronyms, addAcronym,updateAcronym ,removeAcronym} from '../acronym.controller';

export default {
    Query: {
        acronyms,
    },
    Mutation: {
        addAcronym,
        updateAcronym,
        removeAcronym
    }
};
