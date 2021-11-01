import {
    monthsCase,
    dayCase,
    lessonsType,
    lessonsTime
} from "./constants";
const data = require('./schedule.json');

function createWeekMarkup() {
    if (window.innerWidth <= 1200) {
        createMobileWeekMarkup();
    } else {
        createDesktopWeekMarkup();
    }
};

function createDesktopWeekMarkup() {
    localStorage.setItem("currentLayout", "desktop");
    const today = new Date();
    const day = today.getDay();
    const weekStart = today.getDate() - day + 1;
    const todayMonth = today.getMonth() + 1;
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][todayMonth];

    const weekContainer = document.getElementById("week-container");
    weekContainer.innerHTML = "";


    let daysContainer = "";

    for (let i = weekStart; i < weekStart + 5; i++) {
        const date = new Date(2021, todayMonth - 1, i);
        daysContainer += `
            <div class="week__container__days__wrap"> 
                <span class="week__container__days__number">${i} ${monthsCase[todayMonth]}</span> 
                <span class="week__container__days__name">${dayCase[date.getDay()]}</span>            
            </div>
        `;
    }

    const days = document.createElement("div");
    days.className = "week__container__days__wrapper";
    days.innerHTML = `
        <div class="week__container__days">
            ${daysContainer}
        </div>
    `;

    weekContainer.appendChild(days);


    const weekSchedule = document.createElement("div");
    weekSchedule.className = "week__container__vertical";

    const time = document.createElement("div");
    time.className = "week__container__vertical__time";

    let timeContainer = "";

    const todaySchedule = monthSchedule.find(day => day.id === Number(today.getDate()));

    todaySchedule.lessons.forEach(lesson => {
        const time = lessonsTime[lesson.time].split("-");
        timeContainer += `
            <span class="week__container__vertical__time__classes">${time[0]}<br>-<br>${time[1]}</span>
        `;
    });

    time.innerHTML = timeContainer;
    weekSchedule.appendChild(time);

    const schContainer = document.createElement("div");
    schContainer.className = "week__container__vertical__sch";

    let schContent = "";

    for (let i = weekStart; i < weekStart + 5; i++) {
        const daySchedule = monthSchedule.find(day => day.id === Number(i));

        let lessons = "";

        daySchedule.lessons.forEach((lesson, index) => {
            
            let html = "";

            if (lesson.isEmpty) {
                html = '<div class="lesson__empty"></div>';
            } else if (lesson.isSplitted) {
                html = `
                    <div class="sg">
                        <div class="subgroup1">
                            ${lesson.first.isEmpty
                                ? '<div class="lesson__empty"></div>'
                                : `
                                    <span class="lesson__name">${lesson.first.name}</span>
                                    <span class="lesson__type">${lessonsType[lesson.first.type]}</span>
                                    <span class="lesson__teacher">${lesson.first.professor}</span>
                                    <span class="lesson__classroom">Посилання ></span>
                                `
                            }
                        </div>
                        <span class="vertical-line"></span>
                        <div class="subgroup2">
                            ${lesson.second.isEmpty
                                ? '<div class="lesson__empty"></div>'
                                : `
                                    <span class="lesson__name">${lesson.second.name}</span>
                                    <span class="lesson__type">${lessonsType[lesson.second.type]}</span>
                                    <span class="lesson__teacher">${lesson.second.professor}</span>
                                    <span class="lesson__classroom">Посилання ></span>
                                `    
                            }
                        </div>
                    </div>
                `;
            } else {
                html = `
                    <span class="lesson__name">${lesson.general.name}</span>
                    <span class="lesson__type">${lessonsType[lesson.general.type]}</span>
                    <span class="lesson__teacher">${lesson.general.professor}</span>
                    <span class="lesson__classroom">Посилання ></span>
                `;
            }

            lessons += `
                <div class="lesson ${(i - weekStart) % 2 != 0 ? "lesson__type1" : "lesson__type2"}">
                    ${html}
                </div>
            `;
        });



        schContent += `
            <div class="week__container__vertical__sch__day">
                ${lessons}
            </div>
        `;
    }

    schContainer.innerHTML = schContent;

    weekSchedule.appendChild(schContainer);

    weekContainer.appendChild(weekSchedule);

};

function createMobileWeekMarkup() {
    localStorage.setItem("currentLayout", "mobile");
    const chosenDayStore = localStorage.getItem("chosenDay");
    const today = new Date();
    const day = today.getDay();
    const weekStart = today.getDate() - day + 1;
    const todayMonth = today.getMonth() + 1;
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][todayMonth];
    const todaySchedule = monthSchedule.find(day => day.id == Number(chosenDayStore));

    const daysPanel = document.getElementById("days-panel-tablet");
    let daysPanelHtml = "";

    for (let i = weekStart; i < weekStart + 5; i++) {
        const date = new Date(2021, todayMonth - 1, i);
        daysPanelHtml += `
            <div class="days-panel-for-tablet__daycont" id="days-tablet-panel-${i}">
                <span class="days-panel-for-tablet__day">${i} ${monthsCase[todayMonth]}</span>
                <span class="days-panel-for-tablet__weekday">${dayCase[date.getDay()]}</span>
            </div>
        `;
    }

    daysPanel.innerHTML = daysPanelHtml;
    addListenersToDays();

    const chosenDay = document.getElementById(`days-tablet-panel-${chosenDayStore}`)
    setChosenDay(chosenDay);

    const weekContainer = document.getElementById("week-container");
    weekContainer.innerHTML = "";

    const weekSchedule = document.createElement("div");
    weekSchedule.className = "week__container__vertical";

    const timeTablet = document.createElement("div");
    timeTablet.className = "week__container__vertical__time--tablet";

    let timeTabletContainer = '';

    todaySchedule.lessons.forEach(lesson => {
        const time = lessonsTime[lesson.time].split("-");
        timeTabletContainer += `
            <span class="week__container__vertical__time__classes">${time[0]}<br>-<br>${time[1]}</span>
        `;
    });

    timeTablet.innerHTML = `
        <div class="week__container__vertical__time__tablet"></div>
        <div class="week__container__vertical__time__container">
            ${timeTabletContainer}
        </div>`;

    weekSchedule.appendChild(timeTablet);

    const schContainer = document.createElement("div");
    schContainer.className = "week__container__vertical__sch";

    let lessons = "";

    todaySchedule.lessons.forEach(lesson => {
        
        let html = "";

        if (lesson.isEmpty) {
            html = '<div class="lesson__empty"></div>';
        } else if (lesson.isSplitted) {
            html = `
                <div class="sg">
                    <div class="subgroup1">
                        ${lesson.first.isEmpty
                            ? '<div class="lesson__empty"></div>'
                            : `
                                <span class="lesson__name">${lesson.first.name}</span>
                                <span class="lesson__type">${lessonsType[lesson.first.type]}</span>
                                <span class="lesson__teacher">${lesson.first.professor}</span>
                                <span class="lesson__classroom">Посилання ></span>
                            `
                        }
                    </div>
                    <span class="vertical-line"></span>
                    <div class="subgroup2">
                        ${lesson.second.isEmpty
                            ? '<div class="lesson__empty"></div>'
                            : `
                                <span class="lesson__name">${lesson.second.name}</span>
                                <span class="lesson__type">${lessonsType[lesson.second.type]}</span>
                                <span class="lesson__teacher">${lesson.second.professor}</span>
                                <span class="lesson__classroom">Посилання ></span>
                            `    
                        }
                    </div>
                </div>
            `;
        } else {
            html = `
                <span class="lesson__name">${lesson.general.name}</span>
                <span class="lesson__type">${lessonsType[lesson.general.type]}</span>
                <span class="lesson__teacher">${lesson.general.professor}</span>
                <span class="lesson__classroom">Посилання ></span>
            `;
        }

        lessons += `
            <div class="lesson lesson__type1">
                ${html}
            </div>
        `;
    });

    const schContent = `
        <div class="for-tablet">
            <div class="lesson__subgroup__container">
                <div class="lesson__subgroup__title">1 підгрупа</div>
                <div class="lesson__subgroup__title">2 підгрупа</div>
            </div>
            <div class="lesson__container">
                ${lessons}
            </div>
        </div>
    `;

    schContainer.innerHTML = schContent;

    weekSchedule.appendChild(schContainer);

    weekContainer.appendChild(weekSchedule);

};

function setChosenDay(day) {
    const activeDay = document.getElementsByClassName("days-panel-for-tablet__daycont__active")[0];
    if (activeDay) {
        activeDay.classList.remove("days-panel-for-tablet__daycont__active");
    }
    day.classList.add("days-panel-for-tablet__daycont__active");
    localStorage.setItem("chosenDay", day.id.replace( /^\D+/g, ''));
};

function changeChosenDay() {
    setChosenDay(this);
    createMobileWeekMarkup();
};

function addListenersToDays() {
    const days = document.getElementsByClassName("days-panel-for-tablet__daycont");
    for (let day of days) {
        day.addEventListener("click", changeChosenDay);
    }
};

function getScreenSize() {
    const currentLayout = localStorage.getItem("currentLayout");
    if (window.innerWidth <= 1200 && currentLayout == "desktop") {
        createMobileWeekMarkup();
    } else if (window.innerWidth > 1200 && currentLayout == "mobile") {
        createDesktopWeekMarkup();
    } else {}
};

localStorage.setItem("chosenDay", new Date().getDate());
window.addEventListener("resize", getScreenSize);
createWeekMarkup();
