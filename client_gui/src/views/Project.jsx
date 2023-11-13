import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProjects } from "../store/actions/task_manager/project.actions";
import Template from "./template";
import CardButton from "../components/subComponents/CardButton";
import { Button, Card, Metric, Text, Title } from "@tremor/react";

function ContentArea() {
    const dispatch = useDispatch();
    const listProjects = useSelector((state) => state.projectList);
    const { loading, error, projects } = listProjects;

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <p> Loading </p>
            ) : error ? (
                <p> Error </p>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Projects
                    </Metric>
                    <div className="grid md:grid-cols-3 w-full h-full items-center">
                        {projects.map((project) => (
                            <div key={project._id} className="m-3">
                                <CardButton name={project.name} description={project.description}
                                    url={`/project/${project._id}`} buttonText="View Project"
                                />
                            </div>
                        ))}
                        <div key={'create-project'} className="m-3 flex justify-center">
                            <Card className="flex flex-col justify-center items-center border-dashed border-2 border-sky-500 hover:border-solid hover:cursor-pointer text-center font-bold w-full h-full">
                                <Title> Create Project </Title>
                            </Card>
                        </div>
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