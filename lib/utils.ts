import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to generate a random consonant
  const randomConsonant = () => {
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  return consonants[Math.floor(Math.random() * consonants.length)];
};
// Function to generate a random vowel
 const randomVowel = () => {
  const vowels = "AEIOU";
  return vowels[Math.floor(Math.random() * vowels.length)];
};

// Function to generate CVCVC secret
export const generateCode = () => {
  return randomConsonant() + randomVowel() + randomConsonant() + randomVowel() + randomConsonant();
};

// Function to generate a 3-digit PIN
export const generatePin = () => {
  return Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
};