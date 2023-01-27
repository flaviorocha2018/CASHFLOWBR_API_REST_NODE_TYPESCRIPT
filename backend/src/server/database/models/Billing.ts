export interface IBilling {
  id: number;
  clientId: number;
  dateReference: Date;
  amount: number;
  invoiceNumber: number;
  invoiceDate: Date;
  dueDate: Date;
  amountPaid: number;
  paymentDate: Date;
  status: number;

}