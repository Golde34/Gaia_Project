import Item from "../components/subComponents/Item";
import ScoreList from "../components/subComponents/ScoreList";

const RightColumn = () => {
  return (
    <div className="w-full p-2">
      <Item />
      <ScoreList />
    </div>
  );
};

export default RightColumn;