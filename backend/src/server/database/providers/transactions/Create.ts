import { ETableNames } from '../../ETableNames';
import { ITransactions, IUser } from '../../models';
import { Knex } from '../../knex';
import * as yup from 'yup';
import * as userModel from '../../providers/users';
import * as accountModel from '../../providers/accounts';
import { validation } from '../../../shared/middleware';


interface ITransferRequest {
username: string;
value: number;

}


interface IBodyProps extends Omit<ITransferRequest, 'id' > { }

export const transferValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    username: yup.string().required(),
    value: yup.number().required(),
  })),
}));

// username is the user that will receive deposit - userCashOut will be debited
export const verifyUserAndAccountBalance = async ( {username, value}: ITransferRequest, usernameCashOut: string): Promise<string | any > => {
  try {
  //userCashOut below receive 2nd parameter "usernameCashOut which will be debited"
    const userCashOut = await userModel.UsersProvider.getByUserName(usernameCashOut) as IUser;

    if(username === userCashOut.userName){
      throw new Error ('Is not permitted to transfer a value to yourself!');  
    } 
    
    // here I get the user accountId from usernameCashOut
    const cashOutAccountId = await Knex(ETableNames.user).select('accountId').from(ETableNames.user)
      .where('userName', '=', userCashOut.userName)
      .first();
    
    if (!cashOutAccountId) return Error ('User accountId not found!');

    // here I get the id from table accounts where = accountId
    const accountCashOut = await Knex(ETableNames.accounts).select('*').from(ETableNames.accounts)
      .where('id', '=', cashOutAccountId )
      .first();
    // here I verify account balance to perform the operation
    if (accountCashOut.balance < value || value === 0) {
      return new Error ('Balance is insufficient or value should not be zero!');
    }

    const newBalance = Number(accountCashOut.balance) - value;
    // corrigir balance by atualizar balance
    await accountModel.AccountsProvider.updateBalanceById(accountCashOut.id, newBalance as any);

    return accountCashOut.id;
   
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new transfer');
  }

};

export const VerifyingUserExistAndMakeCashIn = async ( userCashIn: string, value: number): Promise<string | any | number > => {
  //creditedAccountID
  const userID = await Knex(ETableNames.user).select('*').from(ETableNames.user)
    .where('userName', '=', userCashIn )
    .first();
  
  if (!userID) throw new Error ('User to receive this deposit not found!');
  // here I receive the user accountID
  const accountCashIn = await userModel.UsersProvider.getUserAccountId(userID.id);
  // here I receive the id from accounts table
  const userAccount = await accountModel.AccountsProvider.getById(accountCashIn);

  const newBalance = Number(userAccount.balance) + value;
  // corrigir update com balance.
  await accountModel.AccountsProvider.updateBalanceById(userAccount, newBalance as any );

  return userAccount.id;

};
// Resolver bugs
export const createTransaction = async ({username, value}: ITransferRequest, usernameCashOut: string) => {
 
  const debitedAccountId = await verifyUserAndAccountBalance({username, value}, usernameCashOut);
  console.log('conta débito: ', debitedAccountId);
  const creditedAccountId = await VerifyingUserExistAndMakeCashIn(username, value);
  console.log('conta crédito: ', creditedAccountId);
  console.log('valor: ', value);
  // dúvida no insert tbm
  const transaction = await Knex(ETableNames.transactions).insert({
    debitedAccountId: debitedAccountId,
    creditedAccountId: creditedAccountId,
    value: value,
  }).into(ETableNames.transactions).returning('id');

  
  return transaction;
};



