export interface IAttendance {
  id: number;
  clientId: number;
  dateReference: Date;
  issue: number;
  userId: number;
  followUp: Date;
  status: number;

}