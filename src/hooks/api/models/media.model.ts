import { BaseModel } from "./";

export enum MediaType {
  LOGO = "LOGO",
  CERTIFICATE_BACKGROUND = "CERTIFICATE_BACKGROUND",
  TEMPLATE_THUMBNAIL = "TEMPLATE_THUMBNAIL",
  CREDENTIAL = "CREDENTIAL",
  OTHER = "OTHER",
}

export type Media = BaseModel & {
  name: string;
  type: keyof typeof MediaType;
  url: string;
  format: string;
  size: number;
};

export type CreateMediaDto = Media;

export type EditMediaDto = Partial<CreateMediaDto>;
