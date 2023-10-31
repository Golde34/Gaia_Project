import CardItem from "./subComponents/CardItem"
import AreaChartComponent from "./subComponents/AreaChartComponent"
import TableComponent from "./subComponents/TableComponent"

const LeftColumn = () => {
    return (
        <div className="w-full flex flex-col justify-between p-2">
            <div className="flex flex-col lg:flex-rpw gap-2 w-full">
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
            <div className="flex-auto w-full">
                <AreaChartComponent />
                <TableComponent />
            </div>
        </div>
    );
};

export default LeftColumn;