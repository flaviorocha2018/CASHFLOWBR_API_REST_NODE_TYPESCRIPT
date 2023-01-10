export interface ITransactions {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  creditedAt: Date;
}