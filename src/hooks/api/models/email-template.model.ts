import { BaseModel } from "./";

export enum EmailTemplateLogoSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type EmailTemplate = BaseModel & {
  name: string;
  subject: string;
  fromName: string;
  body: string;
  attributeIds: string[];
  content: {
    button: { text: string; color: string };
    url: { isDisplay: boolean };
    brand: {
      name: string;
      logo: string;
      logoSize: keyof typeof EmailTemplateLogoSize;
      address: string;
    };
  };
};

export type CreateEmailTemplateDto = EmailTemplate;

export type EditEmailTemplateDto = Partial<CreateEmailTemplateDto>;
