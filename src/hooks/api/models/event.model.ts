import { BaseModel } from "./";

export enum EventType {
  COURSE = "COURSE",
  FIELD_EVENT = "FIELD_EVENT",
  ONLINE_EVENT = "ONLINE_EVENT",
  WORKSHOP = "WORKSHOP",
  WEBINAR = "WEBINAR",
}

export enum EventDurationUnit {
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}

export type Event = BaseModel & {
  name: string;
  description: string;
  type: keyof typeof EventType;
  duration: { unit: keyof typeof EventDurationUnit; value: number };
};

export type CreateEventDto = Event;

export type EditEventDto = Partial<CreateEventDto>;
