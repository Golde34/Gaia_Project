import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProjects } from "../store/actions/task_manager/project.actions";
import Template from "./template";
import CardButton from "../components/subComponents/CardButton";
import { Metric } from "@tremor/react";

function ContentArea() {
    const dispatch = useDispatch();
    const listProjects = useSelector((state) => state.projectList);
    const { loading, error, projects } = listProjects;
    
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    console.log("projects should be there " + projects);

    return (
        <div>
            { loading ? (
                <p> Loading </p>    
            ) : error ? (
                <p> Error </p>
            ) : (
                <>
                <Metric style={{marginBottom:'30px', marginTop:'30px'}} 
                    className="text-2xl font-bold text-gray-800"> Projects 
                </Metric>
                <div className="grid md:grid-cols-3 w-full"> 
                    {projects.map((project) => (
                        <CardButton name={project.name} description={project.description} 
                            url={`/project/${project._id}`} buttonText="View Project"
                        />
                    ))}
                </div>
                </>
            )
        }
        </div>
    )
}

const Project = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default Project;