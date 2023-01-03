import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as Count from './Count';

export const CityProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
  ...Count,
};