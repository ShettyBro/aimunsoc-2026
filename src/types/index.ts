export interface IndividualFormData {
  fullName: string;
  age: string;
  institution: string;
  city: string;
  pincode: string;
  email: string;
  phone: string;
  committeePreference1: string;
  committeePreference2: string;
  committeePreference3: string;
  portfolioPreference1: string;
  portfolioPreference2: string;
  portfolioPreference3: string;
  accommodationRequired: boolean;
  accommodationScheme: '2nights' | '3nights' | '';
  transactionId: string;
}

export interface DelegationFormData {
  institution: string;
  city: string;
  pincode: string;
  headDelegateName: string;
  headDelegateEmail: string;
  headDelegatePhone: string;
  numberOfDelegates: string;
  accommodationRequired: boolean;
  accommodationDelegates: string;
  accommodationScheme: '2nights' | '3nights' | '';
  transactionId: string;
}

export interface ApiResponse {
  success: boolean;
  registrationId?: string;
  message?: string;
}
