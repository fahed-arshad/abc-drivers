import { BaseModel } from "./";

export enum AttributeDataType {
  STRING = "STRING",
  NUMBER = "NUMBER",
}

export type Attribute = BaseModel & {
  name: string;
  dataType: keyof typeof AttributeDataType;
  isFactoryMade: boolean;
};

export type CreateAttributeDto = Omit<Attribute, "isFactoryMade">;

export type EditAttributeDto = Partial<CreateAttributeDto>;
