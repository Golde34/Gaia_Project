import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getProjects } from "../store/actions/task_manager/projectActions";

export default function Project() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                <div>
                    {projects.map((project) => (
                        <div key={project._id}>
                            <div>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => navigate(`/project/${project._id}`)}
                                >
                                    View Project
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        </div>
    )
}