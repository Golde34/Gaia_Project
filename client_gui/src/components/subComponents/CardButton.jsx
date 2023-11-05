import { BadgeDelta, Button, Card, Flex, Metric, Text } from "@tremor/react";
import { useNavigate } from "react-router-dom";

const CardButton = (props) => {

    const navigate = useNavigate();

    return (
        <Card className="w-xs" decoration="top" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Text>{props.name}</Text>
                <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>    
            </Flex>
            <Metric> {props.description} </Metric>
            <Flex justifyContent="end">
                <Button variant="primary" className="p-2" color="indigo"
                    type="button" onClick={() => navigate(props.url)}
                > {props.buttonText}
                </Button>
            </Flex>
        </Card>
    );
};

export default CardButton;