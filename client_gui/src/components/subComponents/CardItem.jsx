import { BadgeDelta, Card, Flex, Metric, Text, Title } from "@tremor/react"

const CardItem = (props) => {
    return (
        <Card className="w-xs" decoration="top" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Metric>{props.name}</Metric>
                <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>    
            </Flex>
            <Text> {props.description} </Text>
        </Card>
    );
};

export default CardItem;