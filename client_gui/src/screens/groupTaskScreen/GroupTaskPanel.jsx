import { Col, Flex, Grid, ProgressBar, TabPanel, Text } from "@tremor/react";
import { CreateTaskDialog } from "../taskScreen/CreateTaskDialog";
import TaskList from "../taskScreen/TaskList"; 

const GroupTaskPanel = (props) => {
    const groupTask = props.groupTask;

    return (
        <>
            <TabPanel key={groupTask._id}>
                <div className="mt-10">
                    <Grid numItems={12} className="gap-2">
                        <Col numColSpan={10}>
                            <Flex className="mt-4">
                                <Text className="w-full">{groupTask.description}</Text>
                                <Flex className="space-x-2" justifyContent="end">
                                    {/* TODO: NUMBER OF TOTAL TASKS AND TASKS DONE -> CALCULATE PERCENTAGE */}
                                    <Text>38% TASKS DONE / TOTAL TASKS</Text>
                                </Flex>
                            </Flex>
                            <ProgressBar value={38} className="mt-2 w-300" />
                        </Col>
                        <Col numColSpan={2} className="mt-4">
                            <div className="flex justify-center">
                                <CreateTaskDialog groupTaskId={groupTask._id} />
                            </div>
                        </Col>
                    </Grid>
                </div>
                <TaskList groupTaskId={groupTask._id}/>
            </TabPanel>
        </>
    )
}

export default GroupTaskPanel;