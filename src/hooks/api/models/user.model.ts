import { BaseModel, Brand, Subscription } from ".";

export type User = Omit<BaseModel, "userId"> & {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  image?: string;
  oAuth: { id: string; provider: string };
  subscription: Subscription;
  usage: {
    certificates: number;
    events: number;
    templates: number;
    emailTemplates: number;
  };
  quota: {
    certificates: number;
    events: number;
    templates: number;
    emailTemplates: number;
  };
  isVerified: boolean;
  brand?: Brand | undefined;
};

export type EditUserDto = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  image?: string | undefined;
};

export type Stats = {
  credentials: number;
  events: number;
  templates: number;
  emailTemplates: number;
};

export type Quota = {
  credentials: number;
  events: number;
  templates: number;
  emailTemplates: number;
};
