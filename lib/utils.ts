import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateOTP(numberOfDigits: number) {
  let digits = '0123456789';
  let OTP = '';
  let len = digits.length
  for (let i = 0; i < numberOfDigits; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }

  return OTP;
}
