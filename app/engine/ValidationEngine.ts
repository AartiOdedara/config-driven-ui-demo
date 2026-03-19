// =================================================================
// VALIDATION ENGINE — Validates inputs using config-defined rules
// =================================================================
// Instead of hard-coding validation logic in each component, all
// rules (required, minLength, maxLength, pattern) and their error
// messages are defined in the backend config under "validations".
//
// Components call:
//   const result = validate(inputValue, config.validations['promoCode']);
//
// The engine returns { valid: boolean, errors: string[] } where
// errors contains human-readable messages from the config.
// =================================================================
import type { ValidationRule } from '../config/types';

/** Result returned by the validate function */
export type ValidationResult = {
  valid: boolean;
  errors: string[];  // empty array if valid
};

/**
 * Validates a string value against config-defined rules.
 *
 * The order of checks:
 *   1. required  — value must not be empty
 *   2. minLength — value must be at least N characters
 *   3. maxLength — value must be at most N characters
 *   4. pattern   — value must match the regex pattern
 *
 * All failing rules accumulate errors (not short-circuit).
 * This lets the UI show ALL problems at once.
 *
 * @param value - The input value to validate
 * @param rules - Validation rules from the backend config
 * @returns ValidationResult with valid flag and error messages
 */
export function validate(value: string, rules: ValidationRule): ValidationResult {
  const errors: string[] = [];

  // ── 1. Required check ───────────────────────────────────────
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(rules.messages.required || 'This field is required');
  }

  // Only run further checks if there's a non-empty value
  if (value && value.trim() !== '') {
    // ── 2. Minimum length check ─────────────────────────────────
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(
        rules.messages.minLength || `Minimum ${rules.minLength} characters required`
      );
    }

    // ── 3. Maximum length check ─────────────────────────────────
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(
        rules.messages.maxLength || `Maximum ${rules.maxLength} characters allowed`
      );
    }

    // ── 4. Regex pattern check ──────────────────────────────────
    if (rules.pattern) {
      try {
        const regex = new RegExp(rules.pattern);
        if (!regex.test(value)) {
          errors.push(
            rules.messages.pattern || 'Invalid format'
          );
        }
      } catch (e) {
        // If the regex from config is invalid, log but don't block the user
        console.error('ValidationEngine: invalid regex pattern:', rules.pattern, e);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
