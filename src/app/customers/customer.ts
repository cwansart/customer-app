export interface CustomerListResult {
  readonly customers: Customer[] | null;
  readonly error?: string;
}

export interface Customer {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly gender: string;
}
