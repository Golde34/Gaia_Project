import { Badge, BadgeDelta, Card, Col, Flex, Grid, Metric, Text } from "@tremor/react"
import { useNavigate } from "react-router-dom";
import { priorityColor, statusColor } from "../../kernels/utils/field-utils";

const CardItem = (props) => {
    const navigate = useNavigate();

    const groupTaskId = props.groupTaskId;
    const projectId = props.projectId;
    const task = props.task;

    const redirectToTaskDetail = () => {
        navigate(`/project/${projectId}`);
        localStorage.setItem("activeTab", groupTaskId);
    }

    const shortenTitle = (title) => {
        if (title.length > 25) {
            return title.substring(0, 20) + "...";
        }
        return title;
    }

    return (
        <button onClick={() => { redirectToTaskDetail() }} className="me-2">
            <Card className="w-full" decoration="top" decorationColor="indigo" style={{ maxWidth: '325px', maxHeight: '200px' }}>
                <Metric>{shortenTitle(task.title)}</Metric>
                <Grid numItems={2}>
                    <Col numColSpan={1}>
                        <Flex justifyContent="start">
                            {task.priority.map((priority) => (
                                <Badge key={`${task.id}-${priority}`} className="me-1 mt-1" color={priorityColor(priority)}>{priority}</Badge>
                            ))}
                        </Flex>
                    </Col>
                    <Col numColSpan={1}>
                        <Flex justifyContent="end">
                            <BadgeDelta className="ms-1 mt-1" deltaType={statusColor(task.status)}>{task.status}</BadgeDelta>
                        </Flex>
                    </Col>
                </Grid>

                <Text className="line-clamp-3 mt-1"> {task.description} </Text>
            </Card>
        </button>
    );
};

export default CardItem;