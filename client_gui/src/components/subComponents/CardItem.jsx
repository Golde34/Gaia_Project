import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react"

const CardItem = () => {
    return (
        <Card className="w-xs" decoration="top" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Text>Some Text</Text>
                <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>    
            </Flex>
            <Metric> Number: $123,123 </Metric>
        </Card>
    );
};

export default CardItem;