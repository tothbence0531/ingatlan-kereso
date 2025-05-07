export interface LengthError {
  requiredLength: number;
  actualLength: number;
}

export interface ValidationErrors {
  minLength?: LengthError;
  maxLength?: LengthError;
  invalidArray?: boolean;
}
