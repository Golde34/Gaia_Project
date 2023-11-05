import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react"

const CardItem = (props) => {
    return (
        <Card className="w-xs" decoration="top" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Text>{props.name}</Text>
                <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>    
            </Flex>
            <Metric> {props.description} </Metric>
        </Card>
    );
};

export default CardItem;