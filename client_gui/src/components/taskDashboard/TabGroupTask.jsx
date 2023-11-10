import { PlusIcon } from "@heroicons/react/outline";
import { TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Card, Tab, TabGroup, TabList } from "@tremor/react"
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
                            icon={activeTab === groupTask._id ? UserGroupIcon : TagIcon}
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
                                    <EllipsisMenu elementName="Group Task" elementId={groupTask._id}/>
                                </div>
                            </div>
                        </Tab>
                    ))}
                    <CreateNewGroupTask />
                </TabList>
                {props.children}
            </TabGroup>
        </Card>
    )
}

export default TabGroupTask;