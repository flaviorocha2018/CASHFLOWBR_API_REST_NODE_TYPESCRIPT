import * as create from './Create';
import * as getAll from './getAll';
import * as getBalanceById from './GetBalanceById';


export const AccountsController = {
  ...create,
  ...getAll,
  ...getBalanceById,


};