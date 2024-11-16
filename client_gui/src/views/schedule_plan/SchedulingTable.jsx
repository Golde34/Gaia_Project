import React, { useState } from 'react';
import Template from '../../components/template/Template';
import dayjs from 'dayjs';
import { generateDate, months } from "../../kernels/utils/calendar";
import cn from "../../kernels/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Button, Card, Metric, Title } from '@tremor/react';
import CardItem from '../../components/subComponents/CardItem';
import { useNavigate } from 'react-router-dom';
import ListCenterButton from '../../components/subComponents/ListCenterButton';
import { useOptimizeTaskByUserDispatch } from '../../kernels/utils/write-dialog-api-requests';
import { useDispatch } from 'react-redux';
import { optimizeTaskByUserId } from '../../api/store/actions/work_optimization/optimize-task.actions';

const task = {
    title: 'Meeting 1 is very long text that\'s good',
    description: '10:00 AM - 11:00 AM',
    location: 'Zoom',
    priority: ['Low'],
}

function ContentArea() {
    const currentDate = dayjs();
    const [selectDate, setSelectDate] = useState(currentDate);

    return (
        <>
            <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                className="text-2xl font-bold text-gray-800"> Schedule Calendar
            </Metric>
            <Card>
                <div className="flex gap-10 sm:divide-x justify-center mt-10">
                    <CalendarChart currentDate={currentDate} selectDate={selectDate} />
                    <div className="w-full sm:px-5">
                        <h1 className=" font-semibold text-white mb-10">
                            Schedule for {selectDate.toDate().toDateString()}
                        </h1>

                        <CardItem task={task} ></CardItem>
                        <CardItem task={task} ></CardItem>
                        <CardItem task={task} ></CardItem>
                        <CardItem task={task} ></CardItem>
                        <CardItem task={task} ></CardItem>

                    </div>
                </div>
            </Card>

            <Card className='mt-10'>

            </Card>
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

    const handleOptimizeClick = (userId) => {
        dispatch(optimizeTaskByUserId(userId))
    }

    const listCenterButton = [
        { name: 'Add Event', color: 'rose' },
        { name: 'Optimize task list', color: 'green', onClick: () => handleOptimizeClick(userId) },
        { name: 'Full calendar', color: 'indigo', onClick: () => navigate('/calendar') },
    ]

    return (
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
    )
}

export default SchedulingTable;
