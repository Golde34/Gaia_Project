import Item from "./subComponents/Item";
import ScoreList from "./subComponents/ScoreList";

const RightColumn = () => {
  return (
    <div className="w-full p-2">
      <Item />
      <ScoreList />
    </div>
  );
};

export default RightColumn;