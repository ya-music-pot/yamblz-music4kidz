import listEmoji from '_data/listEmoji.json';

const dictionaries = {
  listEmoji,
};

export default function (list = { ...dictionaries }) {
  return list;
}
