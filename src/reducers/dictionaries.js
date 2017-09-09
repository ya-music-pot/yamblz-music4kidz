import listEmoji from '_data/listEmoji';
import listActions from '_data/listActions';
import backgroundsList from '_data/backgroundsList';
import achievements from '_data/achievements';

const dictionaries = {
  listEmoji,
  listActions,
  backgroundsList,
  achievements,
};

export default function (list = { ...dictionaries }) {
  return list;
}
