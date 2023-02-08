export interface IClient {
  id: number;
  corporateName: string;
  address: string;
  complement: string;
  neighborhood: string;
  cityId: number;
  email: string;
  cnpj: string;
  inscrState: string;
  inscrCity: string;
  cnaeId: number;
  typeOfBusiness: string;
  contactName: string;
  celular1: number;
  celular2?: number;
  telephone?: number;
  sinceDate?: Date;
  url?: string;
  salesManId?: number;
  statusId: number;
  contractNumber?: number;
}
