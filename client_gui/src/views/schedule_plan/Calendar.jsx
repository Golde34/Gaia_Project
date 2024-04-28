import Template from "../../components/template";

let events = [
    {
        title: 'Event 1',
        startDate: '2020-08-15 08:00',
        endDate: '2020-08-15 10:00',
    },
    {
        title: 'Event 3',
        startDate: '2020-08-15 09:00',
        endDate: '2020-08-15 12:00',
    }

]

function ContentArea() {
    return (
        <div>
            <h1>Content Area</h1>
        </div>
    )
}

const Calendar = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default Calendar;