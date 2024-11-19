import { BaseModel } from "./";

export type Receiver = Omit<BaseModel, "updatedAt" | "createdAt"> & {
  firstName: string;
  lastName?: string;
  email: string;
};

export type CreateReceiverDto = {
  firstName: string;
  lastName?: string;
  email: string;
};

export type EditReceiverDto = Partial<CreateReceiverDto>;
