import { BaseModel, Media } from "./";

export enum TemplateMode {
  CERTIFICATE = "CERTIFICATE",
  BADGE = "BADGE",
}

export type Template = BaseModel & {
  name: string;
  mode: string;
  content: any;
  isFactoryMade: boolean;
  isFree: boolean;
  imageMediaId: string;
  image?: string | undefined;
  attributeIds: string[];
};

export type CreateTemplateDto = Omit<
  Template,
  "isFactoryMAde" | "isFree" | "imageMediaId"
> & {
  name: string;
  mode: keyof typeof TemplateMode;
  content: any;
  attributeIds: string[];
};

export type EditTemplateDto = Partial<CreateTemplateDto>;
