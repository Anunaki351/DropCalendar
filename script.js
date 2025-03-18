document.addEventListener("DOMContentLoaded", function () {
    let currentYear = 1;
    let currentMonthIndex = 0;

    const months = ["عطارد", "ونوس", "زمین", "بهرام", "مشتری", "کیوان", "اورانوس", "نپتون", "دراپلا"];
    const monthDays = [41, 41, 41, 41, 41, 40, 40, 40, 40];
    const startDate = new Date(2018, 6, 23); // 23 جولای 2018 میلادی

    function displayCalendar() {
        document.getElementById("monthYearText").innerText = `ماه ${months[currentMonthIndex]} - سال ${currentYear}`;
        const calendarTable = document.getElementById("calendarTable");
        calendarTable.innerHTML = "<tr><th>روز دراپلا</th><th>تاریخ میلادی</th></tr>";

        let daysInMonth = monthDays[currentMonthIndex];
        if (currentMonthIndex === 5 && isLeapYear(currentYear)) {
            daysInMonth = 41;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const row = calendarTable.insertRow();
            row.insertCell(0).innerText = day;
            row.insertCell(1).innerText = convertToGregorian(currentYear, currentMonthIndex + 1, day);
        }
    }

    function isLeapYear(year) {
        return year % 4 === 0;
    }

    function convertToGregorian(dropYear, dropMonth, dropDay) {
        let totalDays = 0;

        for (let y = 1; y < dropYear; y++) {
            totalDays += isLeapYear(y) ? 366 : 365;
        }

        for (let m = 0; m < dropMonth - 1; m++) {
            totalDays += (m === 5 && isLeapYear(dropYear)) ? 41 : monthDays[m];
        }

        totalDays += dropDay - 1;

        const cal = new Date(startDate);
        cal.setDate(cal.getDate() + totalDays);

        return cal.toISOString().split("T")[0]; // نمایش به‌صورت YYYY-MM-DD
    }

    document.getElementById("prevMonthBtn").addEventListener("click", function () {
        if (currentMonthIndex === 0) {
            if (currentYear > 1) {
                currentYear--;
                currentMonthIndex = months.length - 1;
            }
        } else {
            currentMonthIndex--;
        }
        displayCalendar();
    });

    document.getElementById("nextMonthBtn").addEventListener("click", function () {
        if (currentMonthIndex === months.length - 1) {
            if (currentYear < 50) {
                currentYear++;
                currentMonthIndex = 0;
            }
        } else {
            currentMonthIndex++;
        }
        displayCalendar();
    });

    displayCalendar();
});
 
