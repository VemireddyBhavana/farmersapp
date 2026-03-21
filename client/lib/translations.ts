import { en } from "./i18n/en";
import { hi } from "./i18n/hi";
import { te } from "./i18n/te";
import { ta } from "./i18n/ta";
import { mr } from "./i18n/mr";
import { gu } from "./i18n/gu";
import { kn } from "./i18n/kn";
import { ml } from "./i18n/ml";
import { pa } from "./i18n/pa";
import { bn } from "./i18n/bn";

export type Language = "English" | "Hindi" | "Telugu" | "Tamil" | "Marathi" | "Gujarati" | "Kannada" | "Malayalam" | "Punjabi" | "Bangla";

export const translations: Record<Language, Record<string, string>> = {
  English: en,
  Hindi: hi,
  Telugu: te,
  Tamil: ta,
  Marathi: mr,
  Gujarati: gu,
  Kannada: kn,
  Malayalam: ml,
  Punjabi: pa,
  Bangla: bn,
};
