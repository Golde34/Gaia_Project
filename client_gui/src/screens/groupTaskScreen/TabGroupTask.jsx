import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import { useState } from "react";
import EllipsisMenu from "../../components/EllipsisMenu";
import { CreateNewGroupTask } from "./CreateNewGroupTask";
import { CreateTaskDialog } from "../taskScreen/CreateTaskDialog";
import TaskList from "../taskScreen/TaskList";
import TaskProgress from "../taskScreen/TaskProgress";

const TabGroupTask = (props) => {
    const groupTasks = props.groupTasks;
    const projectId = props.projectId;

    const [activeTab, setActiveTab] = useState(null);

    if (activeTab === null || activeTab === undefined) {
        if (localStorage.getItem("activeTab") === 'none') {
            localStorage.setItem("activeTab", groupTasks[0]._id);
            setActiveTab(groupTasks[0]._id);
        } else {
            setActiveTab(localStorage.getItem("activeTab"));
        }
    }

    const handleTabChange = (tabId) => {
        localStorage.setItem("activeTab", tabId);
        setActiveTab(localStorage.getItem("activeTab"));
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
                                <div className="col-span-2 mt-1" >{groupTask.title}</div>
                                <div className="col-span-2" >
                                    <EllipsisMenu elementName="Group Task" elementId={groupTask._id} projectId={projectId} />
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
                                        {activeTab && (
                                            <TaskProgress groupTaskId={activeTab} />
                                        )}
                                    </Col>
                                    <Col numColSpan={2} className="mt-4">
                                        <div className="flex justify-center">
                                            <CreateTaskDialog groupTaskId={activeTab} />
                                        </div>
                                    </Col>
                                </Grid>
                            </div>
                            {activeTab && (
                                <TaskList groupTaskId={activeTab} projectId={projectId} />
                            )}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </Card>
    )
}

export default TabGroupTask;