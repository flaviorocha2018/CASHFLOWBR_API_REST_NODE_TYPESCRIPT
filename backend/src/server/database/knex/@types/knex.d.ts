import { ICity } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
     city: ICity
    // client: IClient
    // user: IUser
  }
}