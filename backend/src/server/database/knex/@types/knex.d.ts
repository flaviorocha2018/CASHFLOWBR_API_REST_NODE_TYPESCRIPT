import { ICity, IClient, IUser, IAttendance, IBilling, ICnae, IContract, ISalesman, IStatus } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
     city: ICity,
     client: IClient,
     user: IUser,
     attendance: IAttendance,
     billing: IBilling,
     cnae: ICnae,
     contract: IContract,
     salesman: ISalesman,
     status: IStatus,
  }
}