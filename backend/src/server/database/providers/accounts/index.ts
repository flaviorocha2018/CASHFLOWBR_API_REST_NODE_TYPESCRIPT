import * as create from './Create';
import * as getAll from './GetAll';
import * as getBalance from './GetBalance';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as count from './Count';


export const AccountsProvider = {
  ...create,
  ...getAll,
  ...getBalance,
  ...getById,
  ...updateById,
  ...count,

};