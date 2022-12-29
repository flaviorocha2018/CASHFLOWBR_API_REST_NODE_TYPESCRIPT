import { ICity } from '../../models';


declare module 'knex/types/tables' {
  interface tables{
     city: ICity
    // client: IClient
    // user: IUser
  }
}