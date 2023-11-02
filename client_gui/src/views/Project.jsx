import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Project() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProjects = useSelector((state) => state.listProjects);
    const { loading, error, projects } = listProjects;

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