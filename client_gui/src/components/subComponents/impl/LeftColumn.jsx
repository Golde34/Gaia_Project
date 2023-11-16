import CardItem from "../CardItem"
import AreaChartComponent from "../AreaChartComponent"
import TableComponent from "../TableComponent"

const LeftColumn = () => {
    return (
        <div className="w-full flex flex-col justify-between p-2">
            <div className="flex flex-col lg:flex-rpw gap-2 w-full">
                <CardItem name="Something" description="Metric bla bla" />
                <CardItem name="Something" description="Metric bla bla" />
                <CardItem name="Something" description="Metric bla bla" />
            </div>
            <div className="flex-auto w-full">
                <AreaChartComponent />
                <TableComponent />
            </div>
        </div>
    );
};

export default LeftColumn;