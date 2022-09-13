import acronyms from '../../acronym.json';
import fs from 'fs';

// password: password
let acronymModel = acronyms.map((acronym) => ({
  acronym: Object.keys(acronym)[0],
  definition: acronym[Object.keys(acronym)[0]],
}));

const getItems = async (res) => {
    return acronymModel;

};
const createItem = async (params, res) => {
  try{
    
    acronymModel = [...acronymModel, {acronym: params[0], definition: params[1]}];
    fs.writeFileSync(
      'acronym.json',
      JSON.stringify(
        acronymModel.map((acronym) => ({
          [acronym.acronym]: acronym.definition,
        })),
      ),
    );
    return acronymModel;

  } catch (error) {
    return res.status(500).json({
      message: error.message.replace(/['"]+/g, ''),
      error: "write file error",
    });
  }
}

const updateItem = async (params, res) => {
  try{
    acronymModel = acronymModel.map((acronymItem) => {
      if (acronymItem.acronym === params[2])
      {
       acronymItem.definition = params[1];
       acronymItem.acronym = params[0];
      }
      return acronymItem;
    });

    fs.writeFileSync(
      'acronym.json',
      JSON.stringify(
        acronymModel.map((acronym) => ({
          [acronym.acronym]: acronym.definition,
        })),
      ),
    );
    return acronymModel;
  } catch (error) {
    return res.status(500).json({
      message: error.message.replace(/['"]+/g, ''),
      error: "write file error",
    });
  }
}

const isExistItem = async (params, res) => {
    return acronymModel.find(acronymItem => acronymItem.acronym === params[0]);
}

const deleteItem = async (params, res) => {
  try{
    
    acronymModel = acronymModel.filter((acronymItem) => acronymItem.acronym !== params[0]);

    fs.writeFileSync(
      'acronym.json',
      JSON.stringify(
        acronymModel.map((acronym) => ({
          [acronym.acronym]: acronym.definition,
        })),
      ),
    );

  } catch (error) {
    return res.status(500).json({
      message: error.message.replace(/['"]+/g, ''),
      error: "write file error",
    });
  }
}

export {getItems, createItem,  updateItem, isExistItem, deleteItem};
