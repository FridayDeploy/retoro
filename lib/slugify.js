import slugifyUtil from 'slugify';

export const slugify = (text) =>
  slugifyUtil(text, {
    lower: true
  });
