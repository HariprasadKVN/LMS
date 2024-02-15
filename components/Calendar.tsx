import { useState } from "react";

const Header: React.FC = () => {
    const date = new Date();

    return <div>
        {date.toLocaleDateString('en-IN', { year: "numeric", month: 'long', day: '2-digit', weekday: 'long' })}
    </div>
}

const Navigate: React.FC<{ date: Date, navigate: (date: Date) => void }> = ({ date, navigate }) => {



    console.log('component created');
    const next = (event: React.MouseEvent<HTMLDivElement>) => {
        const tempDate = new Date(date);
        tempDate.setMonth(tempDate.getMonth() + 1)
        navigate(tempDate);
    }

    const previous = (event: React.MouseEvent<HTMLDivElement>) => {
        const tempDate = new Date(date);
        tempDate.setMonth(tempDate.getMonth() - 1)
        navigate(tempDate);
    }

    return <div className="flex flex-row">
        <div className="hover:bg-white 
        hover:text-black" onClick={previous}>{"<"}</div>
        <div className="flex-grow text-center">{date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</div>
        <div onClick={next}>{">"}</div>
    </div>
}

const Weekday: React.FC = () => {
    return <div>Mon Tue Wed Thu Fri Sat Sun</div>
}

const Calendar: React.FC<{
    events?: { date: Date, description: string }[],
    weekstart?: string,
    weekend?: string
}> = ({ events, weekstart, weekend }) => {
    const today = new Date();
    const [x, setX] = useState<Date>(today);

    const dateChanged = (date: Date) => {
        setX(date);
    }

    return <div className="border rounded">
        <Header></Header>
        <Navigate date={x} navigate={dateChanged}></Navigate>
        <Weekday></Weekday>
        <Days date={x} />
        <Footer />
    </div>
}

const Days: React.FC<{ date: Date }> = ({ date }) => {
    const dates: Date[] = [];
    //const startDate: Date = new Date(date.getFullYear(), date.getMonth(), 1)

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));


    for (let index = 0; index < 42; index++) {
        let tempDate = new Date(startDate);
        tempDate.setDate(tempDate.getDate() + index);
        dates.push(tempDate);
    }


    return <div className="grid grid-cols-7">
        {dates.map((item, key) =>
            <Day key={key} date={item}></Day>)}


    </div>
}

const Day: React.FC<{ date: Date }> = ({ date }) => {
    return (<div className="border-2 border-blue-900 rounded">
        {date.toLocaleDateString('en-IN', { day: '2-digit' })}
    </div>);
}

const Footer: React.FC = () => {
    return <div>Footer</div>
}

export default Calendar;