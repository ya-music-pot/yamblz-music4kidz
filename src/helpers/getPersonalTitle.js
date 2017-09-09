/**
 * Returns personal title string,
 * which depends on user mood and action
 * @param {Object} emoji
 * @param {Object} action
 * @returns {string}
 */
export default (emoji, action) => {
  const root = emoji.title.slice(0, -2);
  switch (action.form) {
    case 'feminine':
      return `${root}ая ${action.title}`;
    case 'plural':
      return `${root}ые ${action.title}`;
    case 'neuter':
      return `${root}ое ${action.title}`;
    case 'single':
      return emoji.title;
    default:
      return `${emoji.title} ${action.title}`;
  }
};
