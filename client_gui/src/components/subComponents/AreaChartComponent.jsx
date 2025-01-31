import React from "react";
import { Card, Title, AreaChart } from "@tremor/react";
import { ContributionCalendar, createTheme } from 'react-contribution-calendar';
import { generateDataInRange } from "../../kernels/utils/date";

const data = [
  {
    '2025-04-20': { level: 2 }
  },
  {
    '2025-07-08': { level: 1 },
  },
  {
    '2025-07-09': { level: 4, data: {} },
  },
  {
    '2025-03-31': {
      level: 3,
      data: {
        myKey: 'my data',
      },
    },
  },
]


const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const customTheme = createTheme({
  level0: '#20263c',
  level1: '#23525D',
  level2: '#277D7E',
  level3: '#2AA99E',
  level4: '#2dd4bf',
});

const AreaChartComponent = () => {
  return (
    <>
      <Card className="mb-4">
        <Title>Newsletter revenue over time (USD)</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
      </Card>

      <Card>
        <Title>Total 4669 contributions</Title>
        <div className="dark">
          <ContributionCalendar
            theme={customTheme}
            textColor="#4b5364"
            data={generateDataInRange("2025-01-01", "2025-12-31")}
            daysOfTheWeek={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            includeBoundary={false}
            startsOnSunday={true}
            cx={12}
            cy={12}
            cr={5}
            // theme="purquoise"
            onCellClick={(_, data) => console.log(data)}
            scroll={false}
            style={{}}
          />
        </div>
      </Card>
    </>
  );
};

export default AreaChartComponent;