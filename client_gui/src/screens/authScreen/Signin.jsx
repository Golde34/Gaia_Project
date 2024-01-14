import { useDispatch, useSelector } from "react-redux";
import Template from "../../views/template";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftColumn from "../../components/LeftColumn";
import RightColumn from "../../components/RightColumn";
import CardItem from "../../components/subComponents/CardItem";
import AreaChartComponent from "../../components/subComponents/AreaChartComponent";
import { Card, Col, Flex, Grid, Metric, Title } from "@tremor/react";
// import husky scss
import "../../assets/husky.scss";
import { Input, Textarea } from "@material-tailwind/react";
import CheckBoxIcon from "../../components/icons/CheckboxIcon";
import RadioButtonIcon from "../../components/icons/RadioButtonIcon";

function ContentArea() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const gaiaSignin = useSelector((state) => state.gaiaSignin)
    // const { gaiaSigninInfo, loading, error } = gaiaSignin;

    // useEffect(() => {
    //     if (gaiaSigninInfo) {
    //         navigate('/')
    //     } else {
    //         navigate('/signin')
    //     }
    // }, [navigate, gaiaSigninInfo]);


}

const Signin = () => {
    const useParam = useParams();

    const [newName, setNewName] = useState('');
    const [description, setDescription] = useState('');
    const [groupTask] = useState({});
    const projectId = useParam.id;
    // Radio button
    const [status, setStatus] = useState('');
    // Checkbox
    const [isHighPriority, setIsHighPriority] = useState(false);
    const [isMediumPriority, setIsMediumPriority] = useState(false);
    const [isLowPriority, setIsLowPriority] = useState(false);
    const [isStarPriority, setIsStarPriority] = useState(false);
    return (
        <>
            <Grid numItems={12} className="w-full mt-20">
                <Col numColSpan={12} className="mb-10">
                    <Metric>Welcome, I'm Golde. And youre in my AI System.</Metric>
                </Col>
                <Col numColSpan={1}></Col>
                <Col numColSpan={4} className="me-7">
                    <div className="husky">
                        <div className="mane">
                            <div className="coat"></div>
                        </div>
                        <div className="body">
                            <div className="head">
                                <div className="ear"></div>
                                <div className="ear"></div>
                                <div className="face">
                                    <div className="eye"></div>
                                    <div className="eye"></div>
                                    <div className="nose"></div>
                                    <div className="mouth">
                                        <div className="lips"></div>
                                        <div className="tongue"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="torso"></div>
                        </div>
                        <div className="legs">
                            <div className="front-legs">
                                <div className="leg"></div>
                                <div className="leg"></div>
                            </div>
                            <div className="hind-leg">
                            </div>
                        </div>
                        <div className="tail">
                            <div className="tail">
                                <div className="tail">
                                    <div className="tail">
                                        <div className="tail">
                                            <div className="tail">
                                                <div className="tail"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <Title>This is Gaia. My Virtual Dog. I will train him step by step.</Title>
                    </div>
                </Col>
                <Col numColSpan={7}>
                    <Flex justifyContent="end">
                        <Card className="max-w-lg mx-auto">
                            <Title level={3} className="text-center">Sign In</Title>
                            <div className="mt-2">
                                <label htmlFor="task-title" className="block text-md font-medium text-gray-700 mb-3">Username</label>
                                <Input
                                    id="task-title"
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Task Title"
                                />
                            </div>

                            {/* Task Description Input */}
                            <div className="mt-4">
                                <label htmlFor="task-description" className="block text-md font-medium text-gray-700 mb-3">Description</label>
                                <Textarea
                                    id="task-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Task Description"
                                />
                            </div>

                            {/* Priority Checkbox */}
                            <div className="mt-4">
                                <p className="block text-md font-medium text-gray-700 mb-3">Priority</p>
                                <div className="grid grid-cols-4 m-2">
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor="priority-checkbox-high" data-ripple-dark="true">
                                            <input
                                                id="priority-checkbox-high"
                                                type="checkbox"
                                                checked={isHighPriority}
                                                onChange={() => setIsHighPriority(!isHighPriority)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                            />
                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <CheckBoxIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700">High</label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor="priority-checkbox-medium" data-ripple-dark="true">
                                            <input
                                                id="priority-checkbox-medium"
                                                type="checkbox"
                                                checked={isMediumPriority}
                                                onChange={() => setIsMediumPriority(!isMediumPriority)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                            />
                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <CheckBoxIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700">Medium</label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor="priority-checkbox-low" data-ripple-dark="true">
                                            <input
                                                id="priority-checkbox-low"
                                                type="checkbox"
                                                checked={isLowPriority}
                                                onChange={() => setIsLowPriority(!isLowPriority)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                            />
                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <CheckBoxIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700">Low</label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor="priority-checkbox-star" data-ripple-dark="true">
                                            <input
                                                id="priority-checkbox-star"
                                                type="checkbox"
                                                checked={isStarPriority}
                                                onChange={() => setIsStarPriority(!isStarPriority)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:bg-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                            />
                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <CheckBoxIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700">Star</label>
                                    </div>
                                </div>

                            </div>

                            {/* Status Checkbox */}
                            <div className="mt-4">
                                <p className="block text-md font-medium text-gray-700 mb-3">Status</p>
                                <div className="grid grid-cols-3 m-2">
                                    <div className="inline-flex items-center">
                                        <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                            htmlFor="status-radio-todo" data-ripple-dark="true">
                                            <input
                                                id="status-radio-todo"
                                                type="radio"
                                                value="TODO"
                                                checked={status === 'TODO'}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                            />
                                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                <RadioButtonIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700" htmlFor="status-radio-todo">
                                            TO DO
                                        </label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                            htmlFor="status-radio-doing" data-ripple-dark="true">
                                            <input
                                                id="status-radio-doing"
                                                type="radio"
                                                value="IN_PROGRESS"
                                                checked={status === 'IN_PROGRESS'}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                            />
                                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                <RadioButtonIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700" htmlFor="status-radio-doing">
                                            IN PROGRESS
                                        </label>
                                    </div>
                                    <div className="inline-flex items-center">
                                        <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                            htmlFor="status-radio-done" data-ripple-dark="true">
                                            <input
                                                id="status-radio-done"
                                                type="radio"
                                                value="DONE"
                                                checked={status === 'DONE'}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                            />
                                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                <RadioButtonIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700" htmlFor="status-radio-done">
                                            DONE
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Create
                                </button>
                            </div>
                        </Card>
                    </Flex>
                </Col>
            </Grid>

        </>
    )
}

export default Signin;