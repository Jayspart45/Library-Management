// utils.js
export const highlightMatches = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlighted">$1</span>');
  };
  