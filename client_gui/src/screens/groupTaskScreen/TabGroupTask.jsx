import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react"
import { useState } from "react";
import EllipsisMenu from "../../components/EllipsisMenu";
import { CreateNewGroupTask } from "./CreateNewGroupTask";
import GroupTaskPanel from "./GroupTaskPanel";

const TabGroupTask = (props) => {
    const groupTasks = props.groupTasks;
    
    const [activeTab, setActiveTab] = useState(groupTasks[0]._id);
    const [groupTaskId, setGroupTaskId] = useState(groupTasks[0]._id);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setGroupTaskId(tabId);
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
                                    <EllipsisMenu elementName="Group Task" elementId={groupTask._id} />
                                </div>
                            </div>
                        </Tab>
                    ))}
                    <CreateNewGroupTask />
                </TabList>
                <TabPanels>
                    {groupTasks.map((groupTask) => (
                        <GroupTaskPanel groupTask={groupTask} />
                    ))}
                </TabPanels>
            </TabGroup>
        </Card>
    )
}

export default TabGroupTask;