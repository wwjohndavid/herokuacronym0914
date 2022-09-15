import { ApolloError } from 'apollo-server';
import { parseDatabaseErrors } from '../database';
import AcronymModel from './acronym.model';
import acronyms_data from './acronym.json';

export async function acronyms() {
    try {
        const result = await AcronymModel.find({});
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}
export async function populateDB(){
    try {
        const demo = acronyms_data.map((acronym) => ({
            acronym: Object.keys(acronym)[0],
            definition: acronym[Object.keys(acronym)[0]],
            }));
        await AcronymModel.remove({}, () => {
            demo.forEach((element) => {
                new AcronymModel(element).save();
            });    
        });

        return demo;

    } catch (error) {
        parseDatabaseErrors(error);
    }

}
 async function acronymBy(acronym) {
    try {
        const result = await AcronymModel.findOne({acronym:acronym});
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function addAcronym(_, create) {
    try {
        const result = await AcronymModel.create(create);
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function updateAcronym(_, {acronym, updateAcronym, updateDefinition}) {
    try {
        console.log(acronym);

        const item = await acronymBy(acronym);

        if (!item) {
            throw new ApolloError('User not found.');
        }

        const result = await AcronymModel.findOneAndUpdate({acronym:acronym}, {acronym: updateAcronym, definition: updateDefinition});
            

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}


export async function removeAcronym(_, remove) {
    try {
        const result = await AcronymModel.remove(remove);
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}


