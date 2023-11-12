import { ArrowCircleRightIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Button, Card, Col, Flex, Grid, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from "@tremor/react"
import { useState } from "react";
import EllipsisMenu from "./EllipsisMenu";
import { CreateNewGroupTask } from "./CreateNewGroupTask";

const TabGroupTask = (props) => {
    const groupTasks = props.groupTasks;

    const [activeTab, setActiveTab] = useState(groupTasks[0]._id);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    }
    const createNewGroupTask = () => {
        console.log("create new group task");
    }

    return (
        <Card>
            <TabGroup className="mt-3" color="indigo">
                <TabList>
                    {groupTasks.map((groupTask) => (
                        <Tab
                            key={groupTask._id}
                            icon={activeTab === groupTask._id ? ArrowCircleRightIcon : null}
                            onClick={() => handleTabChange(groupTask._id)}
                            style={
                                activeTab === groupTask._id
                                    ? { color: "#6366f1", fontSize: "20px" }
                                    : { color: "white", fontSize: "20px" }
                            }
                        >
                            <div className="grid grid-flow-col gap-4">
                                <div className="col-span-2" >{groupTask.title}</div>
                                <div className="col-span-2" >
                                    <EllipsisMenu elementName="Group Task" elementId={groupTask._id} />
                                </div>
                            </div>
                        </Tab>
                    ))}
                    <CreateNewGroupTask />
                </TabList>
                <TabPanels>
                    {groupTasks.map((groupTask) => (
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
                                            <Button id="create-new-task">Create new Task</Button>
                                        </div>

                                    </Col>
                                </Grid>
                            </div>
                        </TabPanel>
                    ))}
                    {props.children}
                </TabPanels>

            </TabGroup>
        </Card>
    )
}

export default TabGroupTask;