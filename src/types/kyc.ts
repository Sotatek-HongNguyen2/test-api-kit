export enum KYCStatus {
  REQUIRED = 'Required',
  SUBMITTED = 'Submitted',
  COMPLETED = 'Completed',
  FAILED = 'Failed'
}

export interface KYCLevel1 {
  id: string | number;
  address: string;
  lastName: string;
  firstName: string;
  countryId: number;
  city: string;
  level: number;
  dateOfBirth: string;
  postalCode: string;
  status: KYCStatus;
}

export interface KYCLevel2 {
  id: string | number;
  level: number;
  status: KYCStatus;
  imgIdentityBack: string;
  imgIdentityFront: string;
}

export interface KYCLevel3 {
  id: string | number;
  imgAddress: string;
  level: number;
  status: KYCStatus;
}
