import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Calender: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const year = date.getFullYear();
    const month = date.getMonth();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const getDaysInMonth = () => {
        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const lastDayIndex = new Date(year, month + 1, 0).getDay();
        const prevMonthLastDate = new Date(year, month, 0).getDate();

        const days: { date: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

        // Previous month's days
        for (let i = firstDayIndex; i > 0; i--) {
            days.push({
                date: prevMonthLastDate - i + 1,
                isCurrentMonth: false,
                isToday: false,
            });
        }

        // Current month's days
        for (let i = 1; i <= lastDate; i++) {
            days.push({
                date: i,
                isCurrentMonth: true,
                isToday: i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear(),
            });
        }

        // Next month's days
        for (let i = 1; i < 7 - lastDayIndex; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isToday: false,
            });
        }

        return days;
    };

    const days = getDaysInMonth();

    const handlePrevMonth = () => {
        setDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="container">
            <header className="flex justify-between">
                <p className="calenderCurrMonth">
                    {months[month]} {year}
                </p>
                <div className="calenderNavigator flex cursor-pointer">
                    <span onClick={handlePrevMonth}>
                        <GoChevronLeft />
                    </span>
                    <span onClick={handleNextMonth}>
                        <GoChevronRight />
                    </span>
                </div>
            </header>
            <div className="calenderbody flex flex-col">
                <ul className="flex">
                    <li className="m-5">SUN</li>
                    <li className="m-5">MON</li>
                    <li className="m-5">TUE</li>
                    <li className="m-5">WED</li>
                    <li className="m-5">THU</li>
                    <li className="m-5">FRI</li>
                    <li className="m-5">SAT</li>
                </ul>
                <ul className="calenderDates grid grid-cols-7">
                    {days.map((day, index) => (
                        <li
                            key={index}
                            className={`m-5 ${
                                day.isCurrentMonth ? "" : "text-gray-400"
                            } ${day.isToday ? "bg-blue-500 text-white" : ""}`}
                        >
                            {day.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calender;
