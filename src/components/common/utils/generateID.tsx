
import type { AutoPartCategory } from "../../../types/AutoPartCategory";
import type { Part, User } from "../../../types/userParts";

/**
 * Generates a new category ID.
 * Example: CT001, CT002 -> CT003
 */
export function generateCategoryId(
  categories: AutoPartCategory[]
): string {
  const maxId = categories.reduce((max, category) => {
    const match = /^CT(\d+)$/.exec(category.CategoryId);

    return match
      ? Math.max(max, Number(match[1]))
      : max;
  }, 0);

  return `CT${String(maxId + 1).padStart(3, "0")}`;
}

/**
 * Generates a unique listing ID.
 * Example: P001, P002 -> P003
 *
 * Uses the Part.id property.
 */
export function generatePartId(parts: Part[]): string {
  const maxId = parts.reduce((max, part) => {
    const match = /^P(\d+)$/.exec(part.id);

    return match
      ? Math.max(max, Number(match[1]))
      : max;
  }, 0);

  return `P${String(maxId + 1).padStart(3, "0")}`;
}

/**
 * Generates a new auto part ID.
 * Example: PART001, PART002 -> PART003
 *
 * Uses the Part.partId property.
 */
export function generateAutoPartId(parts: Part[]): string {
  const maxId = parts.reduce((max, part) => {
    const match = /^PART(\d+)$/.exec(part.partId);

    return match
      ? Math.max(max, Number(match[1]))
      : max;
  }, 0);

  return `PART${String(maxId + 1).padStart(3, "0")}`;
}

/**
 * Generates a new user ID.
 * Example: U001, U002 -> U003
 */
export function generateUserId(users: User[]): string {
  const maxId = users.reduce((max, user) => {
    const match = /^U(\d+)$/.exec(user.userId);

    return match
      ? Math.max(max, Number(match[1]))
      : max;
  }, 0);

  return `U${String(maxId + 1).padStart(3, "0")}`;
}
