import React, { useCallback, useEffect, useRef, useState } from 'react';
import Template from '../../components/template/Template';
import { generateDate, months } from "../../kernels/utils/calendar";
import CardItem from '../../components/subComponents/CardItem';
import ListCenterButton from '../../components/subComponents/ListCenterButton';
import { optimizeTaskByUserId } from '../../api/store/actions/work_optimization/optimize-task.actions';
import dayjs from 'dayjs';
import cn from '../../kernels/utils/cn';
import { Badge, BadgeDelta, Button, Card, Col, Dialog, DialogPanel, Flex, Grid, List, ListItem, Metric, Text, TextInput } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { getScheduleTaskBatchList, getScheduleTaskList } from '../../api/store/actions/schedule_plan/schedule-task.action';
import MessageBox from '../../components/subComponents/MessageBox';
import { useWebSocket } from '../../kernels/context/WebSocketContext';
import { priorityColor, statusColor } from '../../kernels/utils/field-utils';
import { convertDateToString, convertISODateToString } from '../../kernels/utils/date-picker';

function ContentArea() {
    const userId = "1";
    const dispatch = useDispatch();
    const currentDate = dayjs();
    const [selectDate, setSelectDate] = useState(currentDate);

    const listScheduleTasks = useSelector(state => state.scheduleTaskList);
    const { loading, error, scheduleTasks } = listScheduleTasks;

    const getListScheduleTasks = useCallback(() => {
        dispatch(getScheduleTaskList(userId));
    }, [dispatch, userId]);

    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getListScheduleTasks();
        }, 200);
    }, [])

    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    const checkEmptyTaskListAndOpenModal = () => {
        if (scheduleTasks.length === 0) {
            setIsOpen(true);
            dispatch(getScheduleTaskBatchList(userId))
                .then((batchList) => {
                    setTaskBatchList(batchList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    useEffect(() => {
        if (!loading && !error && scheduleTasks.length === 0) {
            setIsOpen(true);
            dispatch(getScheduleTaskBatchList(userId))
                .then((batchList) => {
                    setTaskBatchList(batchList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loading, error, scheduleTasks]);

    const [taskBatchList, setTaskBatchList] = useState({});

    const chooseTaskBatch = () => {
        return () => {
            openModal();
            dispatch(getScheduleTaskBatchList(userId))
                .then((batchList) => {
                    setTaskBatchList(batchList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <MessageBox message={error} />
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Schedule Calendar
                    </Metric>
                    <Card>
                        <div className="flex gap-10 sm:divide-x justify-center mt-10">
                            <CalendarChart currentDate={currentDate} selectDate={selectDate}
                                checkEmptyScheduleTaskList={checkEmptyTaskListAndOpenModal}
                            />
                            <div className="w-full sm:px-5">
                                <Grid numItems={2}>
                                    <Col numColSpan={1}>
                                        <Flex justifyContent="start">
                                            <h1 className=" font-semibold text-white mt-2 mb-10">
                                                Schedule for {selectDate.toDate().toDateString()}
                                            </h1>
                                        </Flex>
                                    </Col>
                                    <Col numColSpan={1}>
                                        <Flex justifyContent='end'>
                                            <Button type='button' className="col-span-5 mb-10"
                                                color='indigo' onClick={chooseTaskBatch()}>
                                                Choose the Task Batch
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Grid>
                                {
                                    scheduleTasks.length === 0 && (
                                        <Text className="text-center text-white">No task found</Text>
                                    )
                                }
                                {scheduleTasks.map((task, index) => (
                                    <CardItem key={index} task={task} />
                                ))}

                            </div>
                        </div>
                    </Card>

                    <Dialog
                        open={isOpen}
                        onClose={() => closeModal()}
                        static={true}
                        className="z-[100]"
                    >
                        <DialogPanel className="w-full max-w-7xl">
                            <div className="absolute right-0 top-0 pr-3 pt-3">
                                <button
                                    type="button"
                                    className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                                    onClick={() => closeModal()}
                                    aria-label="Close"
                                >
                                </button>
                            </div>
                            <form>
                                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
                                    Your task batch
                                </h4>
                                <div>
                                    {(() => {
                                        const batchNumbers = Object.keys(taskBatchList);
                                        const batchCount = batchNumbers.length;

                                        if (batchCount === 0) {
                                            return <p>No task batch available</p>;
                                        }

                                        let justifyContentClass = '';
                                        if (batchCount === 1) {
                                            justifyContentClass = 'justify-center';
                                        } else if (batchCount === 2) {
                                            justifyContentClass = 'justify-evenly';
                                        } else if (batchCount === 3) {
                                            justifyContentClass = 'justify-between';
                                        }

                                        return (
                                            <>
                                                <div>
                                                    <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-5 text-lg">
                                                        Select a batch to perform the tasks you love first!
                                                    </p>
                                                </div>

                                                <div className={`flex ${justifyContentClass} gap-8`}>
                                                    {batchNumbers.map((batchNumber) => {
                                                        const tasks = taskBatchList[batchNumber] || [];
                                                        return (
                                                            <>
                                                                <div key={batchNumber} className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                                                                        Batch {batchNumber}
                                                                    </h2>
                                                                    <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
                                                                        Select a batch to perform the tasks you love first!
                                                                    </p>
                                                                    <div className="w-full bg-gray-50 dark:bg-gray-900 p-6 rounded-md border border-gray-300 dark:border-gray-700 h-64 flex flex-col justify-between overflow-y-auto">
                                                                        <ul className="mt-4 space-y-3">
                                                                            {tasks.map((task, i) => (
                                                                                <li key={i} className="flex flex-col gap-2">
                                                                                    <div className="flex items-center space-x-3">
                                                                                        <CheckCircleIcon
                                                                                            className="w-5 h-5 text-green-500 dark:text-green-400"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium truncate w-full">
                                                                                            {task.title}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                                                                        <span className="flex items-center space-x-2">
                                                                                            Priority:
                                                                                            {task.priority.map((priority, index) => (
                                                                                                <Badge key={`${task.id}-${priority}-${index}`} className="ms-4 me-1 mt-1" color={priorityColor(priority)}>
                                                                                                    {priority}
                                                                                                </Badge>
                                                                                            ))}
                                                                                        </span>
                                                                                        <span className='flex items-center space-x-2'>
                                                                                            <p>Deadline: {convertISODateToString(task.deadline)}</p>
                                                                                        </span>
                                                                                    </div>
                                                                                    <hr aria-hidden="true" className="my-2 border-t border-gray-300 dark:border-gray-700" />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    <button
                                                                        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                                                        onClick={() => console.log(`Batch ${batchNumber} selected`)}
                                                                    >
                                                                        Select This Batch
                                                                    </button>
                                                                </div>

                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </form>
                        </DialogPanel>
                    </Dialog>
                </>
            )}
        </>
    );
};

const SchedulingTable = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

const CalendarChart = (props) => {
    const userId = "1";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const [today, setToday] = useState(props.currentDate);
    const [selectDate, setSelectDate] = useState(props.selectDate);

    const { sendMessage, messages, isConnected } = useWebSocket();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const checkEmptyTaskList = props.checkEmptyScheduleTaskList;

    useEffect(() => {
        const handleMessage = (message) => {
            const data = JSON.parse(message);
            if (data.type === 'task_optimized' && data.userId === userId) {
                setIsLoading(false);
                setResult('success');
                checkEmptyTaskList();
            } else if (data.type === 'task_failed' && data.userId === userId) {
                setIsLoading(false);
                setResult('failed');
            }
        };

        messages.forEach(handleMessage);
    }, [messages, userId]);

    const handleOptimizeClick = (userId) => {
        setIsLoading(true);
        setResult(null);
        dispatch(optimizeTaskByUserId(userId))
        sendMessage(JSON.stringify({ type: 'optimize_task', userId }));
    };

    const listCenterButton = [
        { name: 'Add Event', color: 'rose' },
        { name: 'Optimize task list', color: 'green', onClick: () => handleOptimizeClick(userId) },
        { name: 'Full calendar', color: 'indigo', onClick: () => navigate('/calendar') },
    ]

    return (
        <>
            <div>
                {isLoading ? (
                    <Text>Loading... Optimizing tasks, please wait.</Text>
                ) : (
                    <p>
                        {result === 'success' && <Text>Optimize tasks successfully</Text>}
                        {result === 'failed' && <Text>Optimize tasks failed</Text>}
                        {!result && <Text>Optimize tasks</Text>}
                    </p>
                )}
            </div>
            <div className="w-full sm:px-5">
                <div className="flex justify-between items-center">
                    <h1 className="select-none font-semibold text-white">
                        {months[today.month()]}, {today.year()}
                    </h1>
                    <div className="flex gap-10 items-center ">
                        <ChevronLeftIcon
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            color='indigo'
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1
                            className=" cursor-pointer hover:scale-105 transition-all text-white"
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                        <ChevronRightIcon
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            color='indigo'
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 mt-5">
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className="text-center h-14 grid place-content-center text-white select-none"
                            >
                                {day}
                            </h1>
                        );
                    })}
                </div>

                <div className=" grid grid-cols-7 ">
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today }, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-14 grid place-content-center border-t text-indigo-600">
                                    <h1
                                        className={cn(
                                            currentMonth ? "" : "text-gray-400",
                                            today
                                                ? "bg-red-600 text-white"
                                                : "",
                                            selectDate
                                                .toDate()
                                                .toDateString() ===
                                                date.toDate().toDateString()
                                                ? "bg-black text-white"
                                                : "",
                                            "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-indigo transition-all cursor-pointer select-none"
                                        )}
                                        onClick={() => {
                                            setSelectDate(date);
                                        }}>
                                        {date.date()}
                                    </h1>
                                </div>
                            );
                        }
                    )}
                </div>

                <ListCenterButton listNameButton={listCenterButton} />
            </div>
        </>
    )
}

export default SchedulingTable;
