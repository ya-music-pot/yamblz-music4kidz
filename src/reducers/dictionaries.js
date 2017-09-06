import listEmoji from '_data/listEmoji';
import listActions from '_data/listActions';
import backgroundsList from '_data/backgroundsList';

const dictionaries = {
  listEmoji,
  listActions,
  backgroundsList,
};

export default function (list = { ...dictionaries }) {
  return list;
}
