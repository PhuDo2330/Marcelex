/**
 * Simple className joiner.
 * Usage: cn("base", condition && "when-true", maybeString)
 */
export function cn(...parts: Array<string | undefined | null | false>) {
    return parts.filter(Boolean).join(" ");
}
