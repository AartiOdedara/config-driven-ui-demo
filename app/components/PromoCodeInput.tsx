// =================================================================
// PROMO CODE INPUT — Demonstrates validation + event handling config
// =================================================================
// This component showcases TWO config-driven concepts:
//
//   1. VALIDATION: The input field is validated against rules defined
//      in config.validations.promoCode — required, minLength,
//      maxLength, pattern, and all error messages come from config.
//
//   2. EVENT HANDLING: The "Apply" button triggers the "applyPromo"
//      action from config.actions. The EventEngine validates the
//      input and shows a success/error message — all defined in
//      config, not hard-coded here.
//
//   3. CONDITIONAL RENDERING: This section only appears when the
//      ConditionalEngine says so (e.g., only during Valentine's Day).
//      The component itself has no visibility logic.
// =================================================================
'use client';

import React, { useState } from 'react';
import type { AppConfig } from '../config/types';
import { executeAction } from '../engine/EventEngine';
import { validate } from '../engine/ValidationEngine';

type PromoCodeInputProps = {
  config: AppConfig;
};

export function PromoCodeInput({ config }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  /**
   * Handles the "Apply" button click.
   * Uses EventEngine to execute the "applyPromo" action from config.
   */
  const handleApply = () => {
    // Reset previous state
    setErrors([]);
    setSuccess(false);

    // Execute the config-driven action
    // The EventEngine will:
    //   1. Look up "applyPromo" in config.actions
    //   2. Find it's a "validate_and_toast" action
    //   3. Run ValidationEngine with config.validations.promoCode
    //   4. Return success/failure with config-defined messages
    const result = executeAction('applyPromo', config, { value: code });

    if (result.success) {
      setSuccess(true);
      setErrors([]);
    } else {
      setSuccess(false);
      // Show individual validation errors if available,
      // otherwise show the general error message
      setErrors(result.errors || [result.message]);
    }
  };

  /**
   * Live validation on input change — gives instant feedback.
   * Uses ValidationEngine directly with config-defined rules.
   */
  const handleChange = (value: string) => {
    setCode(value);
    setSuccess(false);

    // Only validate if user has typed something
    if (value.length > 0) {
      const rules = config.validations['promoCode'];
      if (rules) {
        const result = validate(value, rules);
        setErrors(result.errors);
      }
    } else {
      setErrors([]);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-sm text-gray-800 mb-2">
        🎟️ Have a promo code?
      </h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            placeholder="Enter code (e.g. LOVE20)"
            className={`w-full text-sm px-4 py-2 rounded-xl border outline-none transition-colors
              ${errors.length > 0
                ? 'border-red-300 focus:border-red-500'  // Red border on error
                : success
                  ? 'border-green-300 focus:border-green-500'  // Green on success
                  : 'border-gray-200 focus:border-gray-400'    // Default
              }`}
          />
          {/* ── Config-driven error messages ────────────────────── */}
          {errors.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {errors.map((err, i) => (
                <p key={i} className="text-xs text-red-500">{err}</p>
              ))}
            </div>
          )}
          {/* ── Config-driven success message ───────────────────── */}
          {success && (
            <p className="mt-1 text-xs text-green-600 font-medium">
              {config.actions['applyPromo']?.successMessage || 'Applied!'}
            </p>
          )}
        </div>
        <button
          onClick={handleApply}
          className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-colors"
          style={{ backgroundColor: config.theme.primaryColor }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
