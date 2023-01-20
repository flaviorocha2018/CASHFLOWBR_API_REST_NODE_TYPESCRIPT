import { ETableNames } from '../../ETableNames';
import { ITransactions } from '../../models';
import { Knex } from '../../knex';
import * as yup from 'yup';
import * as userModel from '../../providers/users';
import * as accountModel from '../../providers/accounts';
import { validation } from '../../../shared/middleware';


interface ITransferRequest {
username: string;
value: number;
}


interface IBodyProps extends Omit<ITransferRequest, 'id'> { }

export const transferValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    username: yup.string().required(),
    value: yup.number().required(),
  })),
}));

// username is the user that will receive deposit
export const verifyUserAndAccountBalance = async ( {username, value}: ITransferRequest, usernameCashOut: string): Promise<string | any > => {
  try {
  //userCashOut below receive 2nd parameter "usernameCashOut which will be debited"
    const userCashOut = await userModel.UsersProvider.getByUserName(usernameCashOut);

    if(username === usernameCashOut){
      throw new Error ('Is not permitted to transfer a value to yourself!');  
    } 
    
    // here I get the user accountId from usernameCashOut
    const cashOutAccountId = await Knex(ETableNames.user).select('accountId').from(ETableNames.user)
      .where('userName', '=', userCashOut)
      .first();
    
    if (!cashOutAccountId) return Error ('User accountId not found!');

    // here I get the id from table accounts where = accountId
    const accountCashOut = await Knex(ETableNames.accounts).select('*').from(ETableNames.accounts)
      .where('id', '=', 'cashOutAccountId')
      .first();
    // here I verify account balance to perform the operation
    if (accountCashOut.balance < value || value === 0) {
      return new Error ('Balance is insufficient or value should not be zero!');
    }

    const newBalance = Number(accountCashOut.balance) - value;

    await accountModel.AccountsProvider.updateById(accountCashOut.id, newBalance as any);

    return accountCashOut.id;
   
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new transfer');
  }

};

export const VerifyingUserExistAndMakeCashIn = async ( userCashIn: string, value: number): Promise<string | any | number > => {
  const userID = await Knex(ETableNames.user).select('*').from(ETableNames.user)
    .where('userName', '=', userCashIn )
    .first();
  
  if (!userID) throw new Error ('User to receive this deposit not found!');
  // here I receive the user accountID
  const accountCashIn = await userModel.UsersProvider.getUserAccountId(userID.id);
  // here I receive the id from accounts table
  const userAccount = await accountModel.AccountsProvider.getById(accountCashIn);

  const newBalance = Number(userAccount.balance) + value;

  await accountModel.AccountsProvider.updateById(userAccount, newBalance as any);

  return userAccount.id;

};

export const createTransaction = async (transaction: Omit<ITransactions, 'id'>): Promise< number | Error | any > => {
 
  try {
    const [newTransaction] = await Knex(ETableNames.transactions).insert(transaction).returning('id');
    if (typeof newTransaction === 'object') {
      return newTransaction.id;
    } else if (typeof newTransaction === 'number') {
      return newTransaction;
    }

    return new Error('Error to create this register');
  
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert this transaction');
  }

};

// erros nesta função.

// export const create = async (request: ITransferRequest, usernameCashOut: string) => {
  
//   const { username, value } = transferValidation(req.body, {}, {});

//   const debitedAccountId = await verifyUserAndAccountBalance({username, value}, usernameCashOut);

//   const creditedAccountId = await VerifyingUserExistAndMakeCashIn(username, value); 

//   const transaction = await createTransaction(debitedAccountId, creditedAccountId, value);

// };

// getAll
// getTransactionByDebitDate
// getTransactionByCreditDate