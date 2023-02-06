export interface IAttendance {
  id: number;
  clientId: number;
  dateReference: Date;
  issue: string;
  userId: number;
  followUp: Date;
  status: number;

}