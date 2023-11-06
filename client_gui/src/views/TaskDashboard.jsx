import { useDispatch, useSelector } from "react-redux";
import Template from "./template";
import { useEffect } from "react";
import { getGroupTaskList } from "../store/actions/task_manager/group-task.actions";
import { useParams } from "react-router-dom";
import { Metric } from "@tremor/react";
import CardButton from "../components/subComponents/CardButton";

function ContentArea() {

    const projectId = useParams().id;
    const dispatch = useDispatch();
    const listGroupTasks = useSelector((state) => state.groupTaskList);
    const { loading, error, groupTasks } = listGroupTasks;

    console.log(groupTasks);

    useEffect(() => {
        dispatch(getGroupTaskList(projectId));
    }, [dispatch]);

    return (
        <div>
            { loading ? (
                <p> Loading </p>    
            ) : error ? (
                <p> Error </p>
            ) : (
                <>
                <Metric style={{marginBottom:'30px', marginTop:'30px'}} 
                    className="text-2xl font-bold text-gray-800"> Group Tasks
                </Metric>
                <div className="grid md:grid-cols-3 w-full"> 
                    {groupTasks.map((groupTask) => (
                        <div style={{ marginLeft: '10px', marginRight: '10px'}}>
                        <CardButton name={groupTask.name} description={groupTask.description} 
                            url={`/group-task/${groupTask._id}`} buttonText="View Group Task"
                        />
                        </div>
                    ))}
                </div>
                </>
            )    
        }
        </div>
    )
}


const TaskDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    );
}

export default TaskDashboard;