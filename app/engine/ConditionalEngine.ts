// =================================================================
// CONDITIONAL ENGINE — Evaluates visibility rules from config
// =================================================================
// The backend config contains a "conditions" map where each key is
// a section ID and the value defines visibility rules. This engine
// evaluates those rules against a runtime context object.
//
// How it works:
//   1. SectionRenderer calls evaluateCondition() for each section
//   2. If no condition entry exists → section is visible (default)
//   3. If condition has no rules → return the "visible" default
//   4. If condition has rules → ALL must pass for visibility
//
// Supported operators:
//   eq       — field === value
//   neq      — field !== value
//   gt       — field > value   (numeric comparison)
//   lt       — field < value   (numeric comparison)
//   contains — field includes value (string)
//   isEmpty  — field is empty/null/undefined (no value param needed)
// =================================================================
import type { ConditionConfig, ConditionalRule } from '../config/types';

/**
 * The context object holds current app state that rules evaluate against.
 * Extend this as needed (e.g., add cartCount, userRole, etc.)
 */
export type AppContext = {
  event: string;           // current event identifier ('' for normal)
  [key: string]: unknown;  // extensible for future fields
};

/**
 * Evaluates a single conditional rule against the app context.
 * Returns true if the rule passes, false otherwise.
 */
function evaluateRule(rule: ConditionalRule, context: AppContext): boolean {
  const fieldValue = context[rule.field];

  switch (rule.operator) {
    // ── Equality check ────────────────────────────────────────
    case 'eq':
      return fieldValue === rule.value;

    // ── Inequality check ──────────────────────────────────────
    case 'neq':
      return fieldValue !== rule.value;

    // ── Greater than (numeric) ────────────────────────────────
    case 'gt':
      return typeof fieldValue === 'number' &&
             typeof rule.value === 'number' &&
             fieldValue > rule.value;

    // ── Less than (numeric) ───────────────────────────────────
    case 'lt':
      return typeof fieldValue === 'number' &&
             typeof rule.value === 'number' &&
             fieldValue < rule.value;

    // ── String contains ───────────────────────────────────────
    case 'contains':
      return typeof fieldValue === 'string' &&
             typeof rule.value === 'string' &&
             fieldValue.includes(rule.value);

    // ── Is empty/null/undefined ───────────────────────────────
    case 'isEmpty':
      return fieldValue === '' ||
             fieldValue === null ||
             fieldValue === undefined;

    default:
      // Unknown operator — fail open (show the section)
      console.warn(`ConditionalEngine: unknown operator "${rule.operator}"`);
      return true;
  }
}

/**
 * Evaluates ALL rules in a condition config against the app context.
 *
 * @param condition - The condition config for a section (from backend)
 * @param context   - Current app state (event, cart, user, etc.)
 * @returns true if the section should be visible, false otherwise
 *
 * Logic:
 *   - No condition provided → visible (fail open)
 *   - No rules array → return the "visible" default
 *   - Has rules → ALL rules must pass (AND logic)
 */
export function evaluateCondition(
  condition: ConditionConfig | undefined,
  context: AppContext
): boolean {
  // No condition defined for this section → always visible
  if (!condition) return true;

  // No rules → use the default visibility flag
  if (!condition.rules || condition.rules.length === 0) {
    return condition.visible;
  }

  // All rules must pass (AND logic) for the section to be visible
  return condition.rules.every((rule) => evaluateRule(rule, context));
}
