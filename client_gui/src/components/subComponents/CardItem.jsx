import { BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react"
import { useNavigate } from "react-router-dom";

const CardItem = (props) => {
    const navigate = useNavigate();

    const groupTaskId = props.groupTaskId;
    const projectId = props.projectId;
    const task = props.task;

    const redirectToTaskDetail = () => {
        navigate(`/project/${projectId}`);
        localStorage.setItem("activeTab", groupTaskId);
    }

    return (
        <button onClick={() => { redirectToTaskDetail() }}>
            <Card className="w-xs" decoration="top" decorationColor="indigo">
                <Flex justifyContent="between" alignItems="center">
                    <Metric>{task.title}</Metric>
                    <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>
                </Flex>
                <Text> {task.description} </Text>
            </Card>
        </button>
    );
};

export default CardItem;