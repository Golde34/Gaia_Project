import { PlusIcon } from "@heroicons/react/outline";
import { TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Card, Tab, TabGroup, TabList } from "@tremor/react"
import { useState } from "react";

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
            <TabGroup className="mt-3">
                <TabList variant="line" color="indigo">
                    {groupTasks.map((groupTask) => (
                        <Tab
                            key={groupTask._id}
                            icon={activeTab != groupTask._id ? UserGroupIcon : TagIcon}
                            onClick={() => handleTabChange(groupTask._id)}
                        > {groupTask.title}
                        </Tab>
                    ))}
                    <Tab icon={PlusIcon} onClick={() => createNewGroupTask()}>                        
                    </Tab>
                </TabList>
            </TabGroup>
        </Card>
    )
}

export default TabGroupTask;