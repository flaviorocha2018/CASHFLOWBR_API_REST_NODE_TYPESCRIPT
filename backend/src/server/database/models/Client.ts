export interface IClient {
  id: number;
  corporateName: string;
  address: string;
  complement: string;
  neighborhood: string;
  cityId: number;
  email: string;
  cnpj: number;
  inscrState: number;
  inscrCity: number;
  cnae: number;
  typeOfBusiness: string;
  contactName: string;
  celular1: number;
  celular2?: number;
  telephone?: number;
  sinceDate?: Date;
  url?: string;
  salesManId?: number;
  status: number;
  contractNumber?: number;
}
