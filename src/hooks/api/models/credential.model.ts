import { BaseModel } from "./base.model";
import { Event } from "./event.model";

export enum CredentialType {
  ACHIEVEMENT = "ACHIEVEMENT",
  APPRECIATION = "APPRECIATION",
  PARTICIPATION = "PARTICIPATION",
  MEMBERSHIP = "MEMBERSHIP",
  COMPLETION = "COMPLETION",
  GRADUATION = "GRADUATION",
}

export enum CredentialMode {
  CERTIFICATE = "CERTIFICATE",
  BADGE = "BADGE",
  CERTIFICATE_BADGE = "CERTIFICATE_BADGE",
}

export type Credential = BaseModel & {
  credentialId: string;
  url: string;
  name: string;
  description: string;
  type: string;
  mode: string;
  skills: string[];
  status: string;
  error?: string | undefined;
  revocation?: {
    reason: string;
    timestamp: string;
  };
  email: {
    id?: string | undefined;
    status: string;
    error?: string | undefined;
  };
  media?: {
    certificateImage?: string;
    certificatePdf?: string;
  };
  injectables?: any[];
  event?: Event | undefined;
  template?: any | undefined;
  emailTemplate?: any | undefined;
  receiver?: any | undefined;
  eventId: string;
  templateId: string;
  emailTemplateId: string;
  receiverId: string;
};

export type CreateCredentialDto = {
  name: string;
  description: string;
  type: keyof typeof CredentialType;
  mode: keyof typeof CredentialMode;
  skills: string[];
  injectables: { attributeId: string; value: string }[];
  eventId: string;
  emailTemplateId: string;
  receivers: string[];
};

export type RevokeCredentialDto = {
  reason: string;
  notifyReceiver: boolean;
};
