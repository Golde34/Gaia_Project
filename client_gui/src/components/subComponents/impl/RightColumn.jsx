import Item from "../Item";
import ScoreList from "../ScoreList";

const RightColumn = () => {
  return (
    <div className="w-full p-2">
      <Item />
      <ScoreList />
    </div>
  );
};

export default RightColumn;