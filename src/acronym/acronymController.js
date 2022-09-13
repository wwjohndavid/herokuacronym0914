/* eslint-disable consistent-return */
import matchStr from './acronymUtils';
import { getItems, createItem, updateItem, isExistItem, deleteItem } from '../core/acronyms.model';

const acronyms = async (req, res) => {
  try {

    const rows  = await getItems();

    console.log(rows.length);
    
    const resource = req.path.split('/')[1];

    const offset = parseInt(req.query.from, 10) || 1;

    const limit = parseInt(req.query.limit, 10) || 10;

    if (limit > 100 || limit < 1)
      return res
        .status(400)
        .json({ status: 400, message: 'Requested limit not allowed' });

    const mSet = rows.slice(offset - 1);

    let paginatedmSet = mSet.slice(0, limit);

    if (req.query.search)
      paginatedmSet = matchStr(req.query.search, mSet).slice(0, limit);

    return res
      .header('Access-Control-Expose-Headers', 'Content-Range')
      .header('Access-Control-Expose-Headers', 'Accept-Range')
      .header(
        'Content-Range',
        `${offset - 1}-${offset - 1 + limit - 1}/${rows.length}`
      )
      .header('Accept-Range', `${resource} 100`)
      .status(206)
      .json(paginatedmSet);
  } catch (error) {
    return res.status(500);
  }
};

const createAcronym = async (req, res) => {
  try {

    const { acronym, definition } = req.body;

    const rows  = await createItem([acronym.trim(), definition.trim()], res);
    
    if (rows) {
      return res.status(201).json(rows);
    }
  } catch (error) {
    return res.status(500);
  }
};

const updateAcronym = async (req, res) => {
  try {
    const { acronym, definition } = req.body;
   
    const rows = await updateItem([
      (acronym && acronym.trim()) || req.acronym.acronym,
      (definition && definition.trim()) || req.acronym.definition,
      req.params.acronym,
    ], res);

    if (rows) {
      return res.json(rows);
    }
  } catch (error) {
    return res.status(500);
  }
};

const deleteAcronym = async (req, res) => {
  try {

    await deleteItem([req.params.acronym], res);

    return res
      .status(200)
      .json(`The acronym, ${req.acronym.acronym}, has been deleted`);
  } catch (error) {
    return res.status(500);
  }
};

export { acronyms, createAcronym, updateAcronym, deleteAcronym };
