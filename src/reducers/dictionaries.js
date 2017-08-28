import listEmoji from '_data/listEmoji';
import listActions from '_data/listActions';

const dictionaries = {
  listEmoji,
  listActions,
};

export default function (list = { ...dictionaries }) {
  return list;
}
