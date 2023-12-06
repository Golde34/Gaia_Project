import { Button, Card, Flex, Metric, Text } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import EllipsisMenu from "../EllipsisMenu";

const CardButton = (props) => {
    const navigate = useNavigate();
    
    const color = props.color ? props.color : "indigo";

    const navigateTo = (url) => {
        localStorage.setItem('currentProjectId', props.elementId);
        navigate(url);
    }

    return (
        <Card className="w-xs hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" 
            decoration="top" decorationColor={color}>
            <Flex justifyContent="between" alignItems="center">
                <Metric>{props.name}</Metric>
                <EllipsisMenu elementName="Project" elementId={props.elementId} />
            </Flex>

            <Flex className="mt-4">
                <Text> {props.description} </Text>
                <Button variant="primary" className="p-2" color="indigo"
                    type="button" onClick={() => navigateTo(props.url)}
                > {props.buttonText}
                </Button>
            </Flex>
        </Card>
    );
};

export default CardButton;