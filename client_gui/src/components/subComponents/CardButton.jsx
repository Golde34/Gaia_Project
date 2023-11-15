import { Badge, Button, Card, Flex, Metric, Text } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import EllipsisMenu from "./EllipsisMenu";

const CardButton = (props) => {

    const navigate = useNavigate();

    return (
        <Card className="w-xs" decoration="top" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Metric>{props.name}</Metric>
                <EllipsisMenu elementName="Project" elementId={props.elementId} />
            </Flex>

            <Flex className="mt-4">
                <Text> {props.description} </Text>
                <Button variant="primary" className="p-2" color="indigo"
                    type="button" onClick={() => navigate(props.url)}
                > {props.buttonText}
                </Button>
            </Flex>
        </Card>
    );
};

export default CardButton;