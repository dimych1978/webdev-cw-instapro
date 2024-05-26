export const sanitize = (text) => {
  return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
};
