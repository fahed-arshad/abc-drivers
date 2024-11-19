import { BaseModel } from "./";

export enum Plan {
  FREE = "FREE",
  STARTER = "STARTER",
  PRO = "PRO",
}

export enum BillingInterval {
  MONTHLY = "1_MONTH",
  YEARLY = "12_MONTH",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  OVERDUE = "OVERDUE",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
}

export type Subscription = BaseModel & {
  plan: string;
  price: number;
  status: string;
  billingInterval?: string;
  nextBillingAt?: string;
  nextBillingAmount?: number;
  paymentMethod?: string;
  retryAt?: string;
  cancelAt?: string;
  paddleId?: string;
};
