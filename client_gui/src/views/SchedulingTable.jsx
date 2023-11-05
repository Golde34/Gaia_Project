import React from 'react';

const ScheduleItem = ({ title, startTime, endTime, track, presenter, color }) => {
  // Calculate the duration for height or grid-row-end, assume each unit is 30 minutes for example
  const duration = (new Date(`1970/01/01 ${endTime}`) - new Date(`1970/01/01 ${startTime}`)) / (30 * 60 * 1000);
  const style = {
    backgroundColor: color,
    gridRowEnd: `span ${duration}`,
  };

  return (
    <div className="schedule-item" style={style}>
      <h3>{title}</h3>
      <p>{startTime} - {endTime}</p>
      <p>{track}</p>
      <p>{presenter}</p>
    </div>
  );
};

const SchedulingTable = ({ schedule }) => {
  return (
    <div className="schedule-table">
      {schedule.map((item, index) => (
        <ScheduleItem
          key={index}
          title={item.title}
          startTime={item.startTime}
          endTime={item.endTime}
          track={item.track}
          presenter={item.presenter}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default SchedulingTable;
