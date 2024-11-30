import { GoChevronLeft, GoChevronRight } from "react-icons/go";



const Calender: React.FC = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    const day = document.querySelector(".calenderDates")
    const currDate = document.querySelector(".calenderCurrMonth")
    const prenexIcons = document.querySelectorAll(".calenderNavigator span")
    

    const monthes = [
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
        "December"
    ]


    return <div className="container ">
        <header className=" flex justify-between ">
            <p className="calenderCurrMonth"></p>
            <div className="calenderNavigator flex cursor-pointer ">
                <span><GoChevronLeft /></span>
                <span><GoChevronRight /></span>
            </div>
        </header>
        <div className="calenderbody flex">
            <ul className="flex">
                <li className="m-5">SUN</li>
                <li className="m-5">MON</li>
                <li className="m-5">TUE</li>
                <li className="m-5">WED</li>
                <li className="m-5">THU</li>
                <li className="m-5">FRI</li>
                <li className="m-5">SAT</li>
            </ul>
            <ul className="calenderDates"></ul>
        </div>
    </div>
}
export default Calender