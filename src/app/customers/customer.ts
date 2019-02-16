export interface CustomerListResult {
  readonly customers: Customer[] | null;
  readonly error?: string;
}

export interface Customer {
  readonly id?: number;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly emailAddress: string | null;
  readonly gender: 'MALE' | 'FEMALE' | null;
}
