import { Badge, BadgeDelta, Card, Flex, Text, Title } from "@tremor/react";

export const TaskCard = (props) => {

    const task = props.task;

    const priorityColor = (priority) => {
        if (priority === "Low") {
            return "green";
        }
        else if (priority === "Medium") {
            return "blue";
        }
        else if (priority === "High") {
            return "red";
        }
        else if (priority === "Star") {
            return "yellow";
        }
    }

    const statusColor = (status) => {
        if (status === "To Do") {
            return "decrease";
        }
        else if (status === "In Progress") {
            return "unchanged";
        }
        else if (status === "Done") {
            return "increase";
        }
    }

    return (
        <Card className="mt-3 hover:cursor-pointer" decoration="left" decorationColor="indigo">
            <Flex justifyContent="between" alignItems="center">
                <Title className="w-full">{task.title}</Title>
                <Flex className="space-x-2 m-1" justifyContent="end">
                    {
                        task.priority.length === 0 ? (
                            <Badge color="gray">No Priority</Badge>
                        ) : (
                            task.priority.map((priority) => (
                                <Badge className="m-1" color={priorityColor(priority)}>{priority}</Badge>
                            ))
                        )
                    }
                    <BadgeDelta deltaType={statusColor(task.status)}>{task.status}</BadgeDelta>
                </Flex>
            </Flex>
            <Flex className="space-x-2 m-1" justifyContent="end">
                <Text>{task.deadline}</Text>
            </Flex>
        </Card>
    );
};