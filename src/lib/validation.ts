export const TAG_MIN_LENGTH = 1;
export const TAG_MAX_LENGTH = 20;

export function validateTag(tag: string): boolean {
  return tag.length >= TAG_MIN_LENGTH && tag.length <= TAG_MAX_LENGTH;
}
