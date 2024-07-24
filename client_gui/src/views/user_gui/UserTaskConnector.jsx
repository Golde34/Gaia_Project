import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import Template from "../../components/template/Template";
import { Button, Card, CategoryBar, Col, Flex, Grid, Legend, Metric, NumberInput, Subtitle, Text, TextInput, Title } from "@tremor/react";
import { formatHourNumber } from "../../kernels/utils/date-picker";

function ContentArea(props) {
    const redirectPage = props.redirectPage;
    const dispatch = useDispatch();

    const taskRegistration = useSelector((state) => state.getTaskRegister);
    const { taskRegistry, loading, error} = taskRegistration;
    const didTaskRegisterRef = useRef();

    useEffect(() => {
        if (didTaskRegisterRef.current) return;
        dispatch(taskRegistration());
        didTaskRegisterRef.current = true;
    }, [dispatch]);

    const [sleepTime, setSleepTime] = useState(0);
    const [relaxTime, setRelaxTime] = useState(0);
    const [travelTime, setTravelTime] = useState(0);
    const [eatTime, setEatTime] = useState(0);
    const [workTime, setWorkTime] = useState(24);
    function handleWorkTime(newSleepTime, newRelaxTime, newEatTime, newTravelTime) {
        setWorkTime(24 - newSleepTime - newRelaxTime - newEatTime - newTravelTime);
    }
    function convertTimeToPercents(time) {
        return time * 100 / 24;
    }

    function createTaskRegistry() {
        
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
                    <Grid numItems={12} className="gap-2">
                        <Col numColSpan={12}>
                            <Card className="mt-5" style={{ textAlign: "start" }}>
                                <Title className="text-xl">Introduce</Title>
                                <Text>First you need to calculate your work time by your self. Base on your estimate we will optimize your tasks durings your work day.</Text>
                            </Card>
                        </Col>
                        <Col numColSpan={6}>
                            <Card className="mt-4">
                                <Grid numItems={6}>
                                    <Col numColSpan={6}>
                                        <Title>How much time do you spend sleeping?</Title>
                                    </Col>
                                    <Col numColSpan={2}>
                                        <Legend
                                            className="mt-4"
                                            categories={['Sleeping Time']}
                                            colors={['indigo']}
                                        />
                                    </Col>
                                    <Col numColSpan={4}>
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
                                            error={formatHourNumber(sleepTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                    <Col numColSpan={6}>
                                        <Title className="mt-4">
                                            What time do you usually sleep?
                                        </Title>
                                    </Col>
                                    <Col numColSpan={3}>
                                        <TextInput
                                            className="me-2 mt-3"
                                            style={{ backgroundColor: "white", color: "black" }}
                                            placeholder="Enter your sleep time..."
                                            type="time"
                                        />
                                    </Col>
                                    <Col numColSpan={3}>
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
                        <Col numColSpan={6}>
                            <Card className="mt-4">
                                <Title>How much time do you spend relaxing, eating, and traveling?</Title>
                                <Grid numItems={6}>
                                    <Col numColSpan={2}>
                                        <Legend
                                            className="mt-4"
                                            categories={['Relaxing']}
                                            colors={['blue']}
                                        />
                                    </Col>
                                    <Col numColSpan={4}>
                                        <NumberInput
                                            className="mt-4"
                                            placeholder="Enter your relax time..."
                                            min={0}
                                            max={24}
                                            value={relaxTime}
                                            onChange={e => {
                                                const newRelaxTime = e.target.value;
                                                setRelaxTime(newRelaxTime)
                                                handleWorkTime(sleepTime, newRelaxTime, eatTime, travelTime)
                                            }}
                                            error={formatHourNumber(relaxTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                    <Col numColSpan={2}>
                                        <Legend
                                            className="mt-2"
                                            categories={['Eating']}
                                            colors={['yellow']}
                                        />
                                    </Col>
                                    <Col numColSpan={4}>
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
                                            error={formatHourNumber(eatTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                    <Col numColSpan={2}>
                                        <Legend
                                            className="mt-2"
                                            categories={['Traveling']}
                                            colors={['rose']}
                                        />
                                    </Col>
                                    <Col numColSpan={4}>
                                        <NumberInput
                                            className="mt-2"
                                            placeholder="Enter your travelling time..."
                                            min={0}
                                            max={24}
                                            value={travelTime}
                                            onChange={e => {
                                                const newTravelTime = e.target.value;
                                                setTravelTime(newTravelTime)
                                                handleWorkTime(sleepTime, relaxTime, eatTime, newTravelTime)
                                            }}
                                            error={formatHourNumber(travelTime)}
                                            errorMessage="Please enter a valid number between 0 and 24"
                                        />
                                    </Col>
                                </Grid>
                            </Card>
                        </Col>
                        <Col numColSpan={12}>
                            <Card className="mt-4">
                                <Grid numItems={8}>
                                    <Col numColSpan={3}>
                                        <Title>Is this amount of time of your work? </Title>
                                        <Text>Your work time = 24 - sleepTime - relaxTime - travelTime</Text>
                                    </Col>
                                    <Col numColSpan={5}>
                                        <Title> {workTime} hours</Title>
                                        <CategoryBar
                                            values={[convertTimeToPercents(workTime), convertTimeToPercents(relaxTime),
                                            convertTimeToPercents(eatTime), convertTimeToPercents(travelTime), convertTimeToPercents(sleepTime)]}
                                            colors={['emerald', 'blue', 'yellow', 'rose', 'indigo']}
                                            className="mt-4"
                                            showLabels={false}
                                            showAnimation={true}
                                        />
                                    </Col>
                                </Grid>

                            </Card>
                        </Col>

                    </Grid>
                    <Flex justifyContent="end">
                        <Button className="mt-4"
                            variant="primary" color="indigo"
                            onClick={() => {
                                console.log("Task Registration")
                            }
                            }>
                            Register
                        </Button>
                    </Flex>
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