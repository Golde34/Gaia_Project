import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import Template from "../../components/template/Template";
import { Card, Col, Grid, Metric, NumberInput, Subtitle, Text, TextInput, Title } from "@tremor/react";

function ContentArea(props) {
    const redirectPage = props.redirectPage;
    // const dispatch = useDispatch();

    // const taskRegistration = useSelector((state) => state.taskRegistration);
    // const { taskRegistry, loading, error} = taskRegistration;
    // const didTaskRegisterRef = useRef();

    // useEffect(() => {
    //     if (didTaskRegisterRef.current) return;
    //     dispatch(taskRegistration());
    //     didTaskRegisterRef.current = true;
    // }, [dispatch]);

    const formatNumber = (value) => {
        if (value < 0) {
            return true;
        }
        if (value > 24) {
            return true;
        }
        return false;
    }

    const taskRegistry = false;
    const loading = false;
    const error = false;

    const [sleepTime, setSleepTime] = useState(0);
    const [relaxTime, setRelaxTime] = useState(0);
    const [travelTime, setTravelTime] = useState(0);
    const [eatTime, setEatTime] = useState(0);
    const [workTime, setWorkTime] = useState(24);
    function handleWorkTime(newSleepTime, newRelaxTime, newEatTime, newTravelTime) {
        setWorkTime(24 - newSleepTime - newRelaxTime - newEatTime - newTravelTime);
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : taskRegistry && redirectPage === "Task Manager" ? (
                <div><Navigate to='/project' /></div>
            ) : taskRegistry && redirectPage === "Schedule Plan" ? (
                <div><Navigate to='/schedule' /></div>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800">Task Registration
                    </Metric>
                    <Grid numItems={4} className="gap-2">
                        <Col numColSpan={4}>
                            <Card className="mt-5" style={{ textAlign: "start" }}>
                                <Title className="text-xl">Introduce</Title>
                                <Text>First you need to calculate your work time by your self. Base on your estimate we will optimize your tasks durings your work day.</Text>
                            </Card>
                        </Col>
                        <Col numColSpan={2}>
                            <Card className="mt-4">
                                <Title>How much time do you spend sleeping?</Title>
                                <NumberInput
                                    className="mt-3"
                                    placeholder="Enter your sleep time..."
                                    min={0}
                                    max={24}
                                    value={sleepTime}
                                    onChange={e => {
                                        const newSleepTime = e.target.value;
                                        setSleepTime(newSleepTime)
                                        handleWorkTime(newSleepTime, relaxTime, eatTime, travelTime)
                                    }}
                                    error={formatNumber(sleepTime)}
                                    errorMessage="Please enter a valid number between 0 and 24"
                                />
                                <Title className="mt-4">
                                    What time do you usually sleep?
                                </Title>
                                <Grid numItems={2}>
                                    <Col numColSpan={1}>
                                        <TextInput
                                            className="me-2 mt-3"
                                            style={{ backgroundColor: "white", color: "black" }}
                                            placeholder="Enter your sleep time..."
                                            type="time"
                                        />
                                    </Col>
                                    <Col numColSpan={1}>
                                        <TextInput
                                            className="ms-2 mt-3 text-white"
                                            style={{ backgroundColor: "white", color: "black" }}
                                            placeholder="Enter your sleep time..."
                                            type="time"
                                        />
                                    </Col>
                                </Grid>
                            </Card>
                        </Col>
                        <Col numColSpan={2}>
                            <Card className="mt-4">
                                <Title>How much time do you spend relaxing, eating, and traveling?</Title>
                                <Grid numItems={6}>
                                    <Col numColSpan={1}><Subtitle className="mt-5">Relaxing</Subtitle></Col>
                                    <Col numColSpan={5}>
                                        <NumberInput
                                            className="mt-4"
                                            placeholder="Enter your sleep time..."
                                            min={0}
                                            max={24}
                                            value={relaxTime}
                                            onChange={e => {
                                                const newRelaxTime = e.target.value;
                                                setRelaxTime(newRelaxTime)
                                                handleWorkTime(sleepTime, newRelaxTime, eatTime, travelTime)
                                            }}
                                            error={formatNumber(relaxTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                    <Col numColSpan={1}><Subtitle className="mt-3">Eating</Subtitle></Col>
                                    <Col numColSpan={5}>
                                        <NumberInput
                                            className="mt-2"
                                            placeholder="Enter your eat time..."
                                            min={0}
                                            max={24}
                                            value={eatTime}
                                            onChange={e => {
                                                const newEatTime = e.target.value;
                                                setEatTime(newEatTime)
                                                handleWorkTime(sleepTime, relaxTime, newEatTime, travelTime)
                                            }}
                                            error={formatNumber(eatTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                    <Col numColSpan={1}><Subtitle className="mt-3">Traveling</Subtitle></Col>
                                    <Col numColSpan={5}>
                                        <NumberInput
                                            className="mt-2"
                                            placeholder="Enter your sleep time..."
                                            min={0}
                                            max={24}
                                            value={travelTime}
                                            onChange={e => {
                                                const newTravelTime = e.target.value;
                                                setTravelTime(newTravelTime)
                                                handleWorkTime(sleepTime, relaxTime, eatTime, newTravelTime)
                                            }}
                                            error={formatNumber(travelTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                </Grid>
                            </Card>
                        </Col>
                        <Col numColSpan={4}>
                            <Card className="mt-4">
                                <Title>Is this amount of time of your work? </Title>
                                <Text>Your work time = 24 - sleepTime - relaxTime - travelTime</Text>
                                <Text>{workTime}</Text>
                            </Card>
                        </Col>
                    </Grid>
                </>
            )}
        </>
    )
}

const UserTaskConnector = (props) => {
    return (
        <>
            <Template>
                <ContentArea redirectPage={props.redirectPage} />
            </Template>
        </>
    )
}

export default UserTaskConnector;