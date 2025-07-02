// Custom clsx implementation for conditionally joining class names

// Step 1: Define TypeScript types to ensure type safety
// ClassValue is a union type that represents all possible inputs our function can handle
type ClassValue =
  | string // e.g., "bg-blue-500"
  | number // e.g., 5 (will be converted to "5")
  | boolean // e.g., true or false (only true values make it through)
  | undefined // e.g., someVar && "my-class" where someVar is undefined
  | null // e.g., null values will be skipped
  | ClassDict // e.g., { "bg-blue-500": isActive, "text-white": isLight }
  | ClassArray; // e.g., ["class1", "class2", condition && "class3"]

// This interface represents an object where:
// - Keys are strings (the class names)
// - Values can be anything, but truthy values will include the class, falsy will exclude it
interface ClassDict {
  [key: string]: any;
}

// An array can contain any of the other types, allowing for nesting
type ClassArray = Array<ClassValue>;

/**
 * Joins class names together based on various input types
 *
 * @param args - Class values that can be strings, numbers, booleans, objects, or arrays
 * @returns A string of joined class names
 *
 * USAGE EXAMPLES:
 *
 * // Basic strings
 * clsx('text-red-500', 'font-bold');  // => "text-red-500 font-bold"
 *
 * // Conditional classes with booleans
 * clsx('btn', isActive && 'btn-active');  // If isActive is true => "btn btn-active"
 *                                         // If isActive is false => "btn"
 *
 * // Object syntax
 * clsx('btn', { 'btn-active': isActive, 'btn-large': isLarge });
 *
 * // Arrays for grouping
 * clsx('btn', ['text-sm', isCenter && 'text-center']);
 */
export function clx(...args: ClassValue[]): string {
  // Step 2: Create an array to collect valid class names
  const classes: string[] = [];

  // Step 3: Process each argument passed to the function
  for (const arg of args) {
    // Step 4: Skip falsy values except 0 (since "0" could be a valid class name)
    if (arg === undefined || arg === null || arg === false) {
      continue; // Skip to the next iteration
    }

    // Step 5: Handle strings and numbers directly
    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(arg.toString()); // Convert to string and add to our array
      continue; // Skip to the next iteration
    }

    // Step 6: Handle arrays recursively
    if (Array.isArray(arg)) {
      // Call clsx recursively with array elements spread as arguments
      const innerClasses = clx(...arg);
      if (innerClasses) {
        classes.push(innerClasses); // Add the result if not empty
      }
      continue; // Skip to the next iteration
    }

    // Step 7: Handle objects (most complex case)
    if (typeof arg === "object") {
      // Iterate through each key-value pair in the object
      for (const key in arg) {
        // Ensure the key belongs to the object itself (not inherited)
        // And only include the class name if the value is truthy
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key); // Add the key (class name) to our array
        }
      }
    }
  }

  // Step 8: Join all collected class names with a space and return
  return classes.join(" ");
}

/**
 * Alternative export name for the same function
 * Many developers prefer shorter names like 'cn' instead of 'clsx'
 * This allows for both imports: { clsx } or { cn }
 */
export const cn = clx;

// Default export for importing without braces: import clsx from './utils/clsx'
export default clx;
