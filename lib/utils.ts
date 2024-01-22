import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  return (
    randomConsonant() +
    randomVowel() +
    randomConsonant() +
    randomVowel() +
    randomConsonant()
  );
};

// Function to generate a 3-digit PIN
export const generatePin = () => {
  return Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999
};

// Function to check if a string has a Vowel
export const isVowel = (char: string): boolean => {
  return ["A", "E", "I", "O", "U"].includes(char);
};

// function to check is a string has a consonant
export const isConsonant = (char: string): boolean => {
  return !isVowel(char) && /[A-Z]/.test(char);
};

export const buttonColorMap: { [key: string]: string } = {
  Question: "bg-red-500 hover:bg-red-500/90",
  Aha: "bg-yellow-500 hover:bg-yellow-500/90",
  "I'm lost": "bg-purple-500 hover:bg-purple-500/90",
  Reference: "bg-blue-500 hover:bg-blue-500/90",
  Comment: "bg-gray-500 hover:bg-gray-500/90",
};
