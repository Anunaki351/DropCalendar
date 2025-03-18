document.addEventListener("DOMContentLoaded", function () {
    const monthYearText = document.getElementById("monthYearText");
    const calendarTable = document.getElementById("calendarTable").querySelector("tbody");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const prevYearBtn = document.getElementById("prevYearBtn");
    const nextYearBtn = document.getElementById("nextYearBtn");
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");

    let currentYear = 1;
    let currentMonthIndex = 0;

    const months = ["عطارد", "ونوس", "زمین", "بهرام", "مشتری", "کیوان", "اورانوس", "نپتون", "دراپلا"];
    const monthDays = [41, 41, 41, 41, 41, 40, 40, 40, 40];
    const startDate = new Date(2018, 6, 23); // 23 جولای 2018 میلادی که یک دوشنبه است

    function updateCalendar() {
        monthYearText.textContent = `ماه ${months[currentMonthIndex]} - سال ${currentYear}`;

        calendarTable.innerHTML = "";

        let daysInMonth = monthDays[currentMonthIndex];
        if (currentMonthIndex === 5 && isLeapYear(currentYear)) {
            daysInMonth = 41;
        }

        let firstDayOfWeek = calculateFirstDayOfMonth(currentYear, currentMonthIndex + 1); // دوشنبه شروع هفته

        let row = document.createElement("tr");

        // اضافه کردن خانه‌های خالی برای تنظیم اولین روز هفته
        for (let i = 0; i < firstDayOfWeek; i++) {
            let emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let cell = document.createElement("td");
            cell.textContent = day;

            // روزهای دوشنبه را قرمز کن
            if ((firstDayOfWeek + day - 1) % 7 === 0) {
                cell.classList.add("red-day");
            }

            // اضافه کردن تاریخ میلادی
            let gregorianDate = convertToGregorian(currentYear, currentMonthIndex + 1, day);
            let smallText = document.createElement("small");
            smallText.textContent = gregorianDate;
            smallText.style.display = "block";
            smallText.style.color = "gray";
            smallText.style.fontSize = "12px";
            cell.appendChild(smallText);

            row.appendChild(cell);

            // اگر به آخر هفته رسیدیم، سطر را ببند و یک سطر جدید شروع کن
            if ((firstDayOfWeek + day) % 7 === 0) {
                calendarTable.appendChild(row);
                row = document.createElement("tr");
            }
        }

        // افزودن آخرین ردیف اگر کامل نشده باشد
        if (row.children.length > 0) {
            calendarTable.appendChild(row);
        }
    }

    function calculateFirstDayOfMonth(year, month) {
        let totalDays = 0;

        for (let y = 1; y < year; y++) {
            totalDays += isLeapYear(y) ? 366 : 365;
        }

        for (let m = 0; m < month - 1; m++) {
            totalDays += m === 5 && isLeapYear(year) ? 41 : monthDays[m];
        }

        return (totalDays % 7); // روز دوشنبه = 0
    }

    function convertToGregorian(dropYear, dropMonth, dropDay) {
        let totalDays = 0;

        for (let y = 1; y < dropYear; y++) {
            totalDays += isLeapYear(y) ? 366 : 365;
        }

        for (let m = 0; m < dropMonth - 1; m++) {
            totalDays += m === 5 && isLeapYear(dropYear) ? 41 : monthDays[m];
        }

        totalDays += dropDay - 1;

        let gregorianDate = new Date(startDate);
        gregorianDate.setDate(gregorianDate.getDate() + totalDays);

        return `${gregorianDate.getFullYear()}-${(gregorianDate.getMonth() + 1).toString().padStart(2, "0")}-${gregorianDate.getDate().toString().padStart(2, "0")}`;
    }

    function isLeapYear(year) {
        return year % 4 === 0;
    }

    prevMonthBtn.addEventListener("click", function () {
        if (currentMonthIndex === 0) {
            if (currentYear > 1) {
                currentYear--;
                currentMonthIndex = months.length - 1;
            }
        } else {
            currentMonthIndex--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
        if (currentMonthIndex === months.length - 1) {
            currentYear++;
            currentMonthIndex = 0;
        } else {
            currentMonthIndex++;
        }
        updateCalendar();
    });

    prevYearBtn.addEventListener("click", function () {
        if (currentYear > 1) {
            currentYear--;
            updateCalendar();
        }
    });

    nextYearBtn.addEventListener("click", function () {
        currentYear++;
        updateCalendar();
    });

    for (let i = 1; i <= 50; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `سال ${i}`;
        yearSelect.appendChild(option);
    }

    months.forEach((month, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    yearSelect.addEventListener("change", function () {
        currentYear = parseInt(yearSelect.value);
        updateCalendar();
    });

    monthSelect.addEventListener("change", function () {
        currentMonthIndex = parseInt(monthSelect.value);
        updateCalendar();
    });

    updateCalendar();
});
