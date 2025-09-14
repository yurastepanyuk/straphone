export type ID = number;

export interface BaseEntityI {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: ID;
  updatedBy?: ID;
}
