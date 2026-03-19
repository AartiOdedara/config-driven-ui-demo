// =================================================================
// EVENT ENGINE — Executes config-driven actions
// =================================================================
// Components don't hard-code what happens on click. Instead, they
// call executeAction() with an action ID, and this engine looks up
// the action descriptor in the config and executes it.
//
// This decouples UI from behavior:
//   - Backend defines WHAT happens (toast message, navigation URL)
//   - Frontend defines HOW it happens (show alert, redirect)
//   - Change behavior without code deployment
//
// Supported action types:
//   "toast"              — show a message with template interpolation
//   "navigate"           — redirect to a URL
//   "validate_and_toast" — validate input first, then show result
//
// Template interpolation:
//   Action messages can contain {{key}} placeholders that get
//   replaced with values from the payload. For example:
//     message: "{{productName}} added to cart!"
//     payload: { productName: "Milk" }
//     result:  "Milk added to cart!"
// =================================================================
import type { AppConfig, ActionConfig } from '../config/types';
import { validate } from './ValidationEngine';

/**
 * Payload passed to executeAction — contains dynamic data
 * that gets interpolated into action messages.
 */
export type ActionPayload = {
  [key: string]: string | number | boolean | undefined;
};

/**
 * Return type of executeAction — components can use this to
 * update their UI (e.g., show validation errors).
 */
export type ActionResult = {
  success: boolean;
  message: string;
  errors?: string[];
};

/**
 * Interpolates {{key}} placeholders in a template string
 * with values from the payload object.
 *
 * Example:
 *   interpolate("Hello {{name}}!", { name: "World" })
 *   → "Hello World!"
 */
function interpolate(template: string, payload: ActionPayload): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return payload[key]?.toString() ?? '';
  });
}

/**
 * Executes a config-driven action.
 *
 * @param actionId - Key in config.actions (e.g. "addToCart")
 * @param config   - The full AppConfig (to access actions & validations)
 * @param payload  - Dynamic data for interpolation and validation
 * @returns ActionResult indicating success/failure and message
 *
 * NOTE: In production, the "toast" type would use a proper toast
 * library (e.g., react-hot-toast, sonner). For this demo, we use
 * window.alert() to keep dependencies minimal and the concept clear.
 */
export function executeAction(
  actionId: string,
  config: AppConfig,
  payload: ActionPayload = {}
): ActionResult {
  // ── Look up the action in config ────────────────────────────
  const action: ActionConfig | undefined = config.actions[actionId];

  if (!action) {
    console.warn(`EventEngine: action "${actionId}" not found in config`);
    return { success: false, message: `Unknown action: ${actionId}` };
  }

  switch (action.type) {
    // ── TOAST — Show a message ──────────────────────────────────
    // Interpolates {{placeholders}} with payload values
    case 'toast': {
      const message = interpolate(action.message || '', payload);
      // In production: toast.success(message)
      alert(message);
      return { success: true, message };
    }

    // ── NAVIGATE — Redirect to a URL ────────────────────────────
    case 'navigate': {
      const url = action.url || '/';
      // In production: router.push(url) or window.location.href = url
      alert(`🔗 Navigating to: ${url} (demo — no actual navigation)`);
      return { success: true, message: `Navigating to ${url}` };
    }

    // ── VALIDATE_AND_TOAST — Validate input, then show result ───
    // This combines ValidationEngine + toast in one action.
    // The validationKey references a field in config.validations.
    case 'validate_and_toast': {
      const validationKey = action.validationKey;

      // Guard: need a validation key to know which rules to use
      if (!validationKey) {
        return { success: false, message: 'No validation key specified' };
      }

      const rules = config.validations[validationKey];
      if (!rules) {
        return { success: false, message: `No validation rules for "${validationKey}"` };
      }

      // The input value is expected in the payload under "value"
      const inputValue = (payload.value as string) || '';
      const result = validate(inputValue, rules);

      if (result.valid) {
        const msg = action.successMessage || 'Success!';
        alert(msg);
        return { success: true, message: msg };
      } else {
        // Show the first validation error (or all, depending on UX preference)
        const errorMsg = result.errors.join('\n');
        return { success: false, message: action.errorMessage || errorMsg, errors: result.errors };
      }
    }

    default:
      console.warn(`EventEngine: unsupported action type "${action.type}"`);
      return { success: false, message: `Unsupported action type: ${action.type}` };
  }
}
