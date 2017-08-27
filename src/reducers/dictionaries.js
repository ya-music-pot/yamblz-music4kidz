import listEmoji from '_data/listEmoji.json';
import listActions from '_data/listActions.json';

const dictionaries = {
  listEmoji,
  listActions,
};

export default function (list = { ...dictionaries }) {
  return list;
}
