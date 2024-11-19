import { BaseModel, Media } from "./";

export enum BrandType {
  PERSONAL = "PERSONAL",
  INSTITUTE = "INSTITUTE",
  ORGANIZATION = "ORGANIZATION",
  COMMUNITY = "COMMUNITY",
  COMPANY = "COMPANY",
}

export enum BrandIndustry {
  AGRICULTURE = "AGRICULTURE",
  TRANSPORTATION = "TRANSPORTATION",
  EDUCATION = "EDUCATION",
  TECHNOLOGY = "TECHNOLOGY",
  FINANCE = "FINANCE",
  MEDIA = "MEDIA",
  HEALTH = "HEALTH",
  ENTERTAINMENT = "ENTERTAINMENT",
  OTHER = "OTHER",
}

export enum SocialMedia {
  TWITTER = "TWITTER",
  FACEBOOK = "FACEBOOK",
  LINKEDIN = "LINKEDIN",
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
}

export type Brand = BaseModel & {
  name: string;
  description: string;
  type: keyof typeof BrandType;
  industry: keyof typeof BrandIndustry;
  email: string;
  phone: string;
  address: { line1: string; line2: string; city: string; country: string };
  logo: string;
  website: string;
  socialMedias: { name: keyof typeof SocialMedia; url: string }[];
  linkedInId: string;
};

export type CreateBrandDto = Brand;

export type EditBrandDto = Partial<CreateBrandDto>;
