import {
    months,
    monthTemplates,
    monthsCase,
    dayCase,
    lessonsType,
    lessonsTime
} from "./constants";
const data = require('./schedule.json');

const popUp = document.getElementById('month-popup');

function addListenersToClose() {
    const closeMonthPopUp = document.getElementById('month-close-popup');
    const popUp = document.getElementById('month-popup');
    closeMonthPopUp.addEventListener('click', ()=> {
        popUp.style.visibility = 'hidden';
        popUp.style.opacity = 0;
        document.getElementsByClassName("header")[0].classList.remove("disable");
        document.getElementsByClassName("nav")[0].classList.remove("disable");
        document.getElementsByClassName("month__container")[0].classList.remove("disable");
        const currentActiveDay = document.getElementsByClassName("month__markup__day--chosen")[0];
        if (currentActiveDay) {
            currentActiveDay.classList.remove("month__markup__day--chosen");
        }
        localStorage.setItem("activeDay", "");
    })
}


function createMobileMonthDay() {
    popUp.style.visibility = 'visible';
    popUp.style.opacity = 1;
    document.getElementsByClassName("header")[0].classList.add("disable");
    document.getElementsByClassName("nav")[0].classList.add("disable");
    document.getElementsByClassName("month__container")[0].classList.add("disable");
    const activeDay = localStorage.getItem("activeDay");
    const activeMonth = localStorage.getItem("currentMonth");
    const activeDate = new Date(2021, activeMonth - 1, activeDay);
    const scheduleContainer = document.getElementById("month-popup");
    scheduleContainer.innerHTML = "";
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][activeMonth];
    const daySchedule = monthSchedule.find(day => day.id === Number(activeDay));
    const title = document.createElement("div");
    title.className = "month__popup__title";
    title.innerHTML = `
        <p class="month__popup__date">
            ${activeDay} ${monthsCase[activeMonth]}
        </p>
        <p class="month__popup__weekday">
            ${dayCase[activeDate.getDay()]}
        </p>`;

    scheduleContainer.appendChild(title);

    const monthDiv = document.createElement("div");
    monthDiv.className = "month__popup__container";

    if (!daySchedule) {
        const container = document.createElement("div");
        container.className = "month__popup__class__container--empty";
        container.innerHTML = "<p>Здається, сьогодні пар немає...</p><p>Відпочивай!</p>";
        monthDiv.appendChild(container);
    } else {
        const subgroupsContainer = document.createElement("div");
        subgroupsContainer.className = "month__popup__class__subgroup__container";
        subgroupsContainer.innerHTML = `
            <div class="month__popup__class__subgroups">
            <p class="month__popup__class__subgroup">1 підгрупа</p>
            <p class="month__popup__class__subgroup">2 підгрупа</p>
            </div>`;
    
        monthDiv.appendChild(subgroupsContainer);

        const lessons = daySchedule.lessons.map((lesson, index) => {
            const time = lessonsTime[lesson.time].split("-");

            let classes = "";

            if (lesson.isEmpty) {
                classes = '<div class="month__popup__class__full"></div>';

            } else if (lesson.isSplitted) {
                classes = `
                    <div class="month__popup__class month__popup__class--sub ${lesson.first.isEmpty ? 'month__popup__class--empty' : ''}">
                        ${lesson.first.isEmpty
                            ? `
                            <div class="month__popup__class__empty"></div>`
                            : `
                            <div class="month__popup__class__title">
                                <p class="month__popup__class__name">${lesson.first.name}</p>
                                <p class="month__popup__class__type">${lessonsType[lesson.first.type]}</p>
                            </div>
                            <p class="month__popup__class__professor">${lesson.first.professor}</p>
                            ${lesson.first.isOnline 
                                ? `<a class="month__popup__class__place" href="${lesson.first.place}">Посилання ></a>`
                                : `<p class="month__popup__class__place">${lesson.first.place}</p>`
                            }
                        `}
                    </div>
                    <div class="month__popup__class__divider"></div>
                    <div class="month__popup__class month__popup__class--sub ${lesson.second.isEmpty ? 'month__popup__class--empty' : ''}">
                        ${lesson.second.isEmpty
                            ? `
                            <div class="month__popup__class__empty"></div>`
                            : `
                            <div class="month__popup__class__title">
                                <p class="month__popup__class__name">${lesson.second.name}</p>
                                <p class="month__popup__class__type">${lessonsType[lesson.second.type]}</p>
                            </div>
                            <p class="month__popup__class__professor">${lesson.second.professor}</p>
                            ${lesson.second.isOnline 
                                ? `<a class="month__popup__class__place" href="${lesson.second.place}">Посилання ></a>`
                                : `<p class="month__popup__class__place">${lesson.second.place}</p>`
                            }
                        `}
                    </div>
                    `;

            } else {
                classes = `
                    <div class="month__popup__class">
                        <div class="month__popup__class__title">
                            <p class="month__popup__class__name">${lesson.general.name}</p>
                            <p class="month__popup__class__type">${lessonsType[lesson.general.type]}</p>
                        </div>
                        <p class="month__popup__class__professor">${lesson.general.professor}</p>
                        ${lesson.general.isOnline 
                            ? `<a class="month__popup__class__place" href="${lesson.general.place}">Посилання ></a>`
                            : `<p class="month__popup__class__place">${lesson.general.place}</p>`
                        }
                    </div>
                `;
            }

            return `
                <div class="month__popup__time"><p>${time[0]}</p><p>-</p><p>${time[1]}</p></div>
                <div class="month__popup__class__group ${index % 2 != 0 ? "month__popup__class__group--red" : ""}">
                    ${classes}
                </div>`;
        });

        for (let y = 0; y < lessons.length; y++) {
            const container = document.createElement("div");
            container.className = "month__popup__class__container";
            container.innerHTML = lessons[y];

            monthDiv.appendChild(container);
        }
    }

    scheduleContainer.appendChild(monthDiv);
    scheduleContainer.innerHTML += '<button class="month__popup__close-button" id="month-close-popup">&#10006;</button>';
    addListenersToClose();
}


function createMonthDay(){
    const activeDay = localStorage.getItem("activeDay");
    const activeMonth = localStorage.getItem("currentMonth");
    const activeDate = new Date(2021, activeMonth - 1, activeDay);
    const scheduleContainer = document.getElementById("month-schedule");
    scheduleContainer.innerHTML = "";
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][activeMonth];
    const daySchedule = monthSchedule.find(day => day.id === Number(activeDay));
    const title = document.createElement("div");
    title.className = "month__schedule__title";
    title.innerHTML = `
        <p class="month__schedule__date">
            ${activeDay} ${monthsCase[activeMonth]}
        </p>
        <p class="month__schedule__weekday">
            ${dayCase[activeDate.getDay()]}
        </p>`;

    scheduleContainer.appendChild(title);

    const monthDiv = document.createElement("div");
    monthDiv.className = "month__schedule__container";

    if (!daySchedule) {
        const container = document.createElement("div");
        container.className = "month__schedule__class__container--empty";
        container.innerHTML = "<p>Здається, сьогодні пар немає...</p><p>Відпочивай!</p>";
        monthDiv.appendChild(container);
    } else {
        const subgroupsContainer = document.createElement("div");
        subgroupsContainer.className = "month__schedule__class__subgroup__container";
        subgroupsContainer.innerHTML = `
            <div class="month__schedule__class__subgroups">
            <p class="month__schedule__class__subgroup">1 підгрупа</p>
            <p class="month__schedule__class__subgroup">2 підгрупа</p>
            </div>`;
    
        monthDiv.appendChild(subgroupsContainer);

        const lessons = daySchedule.lessons.map((lesson, index) => {
            const time = lessonsTime[lesson.time].split("-");

            let classes = "";

            if (lesson.isEmpty) {
                classes = '<div class="month__schedule__class__full"></div>';

            } else if (lesson.isSplitted) {
                classes = `
                    <div class="month__schedule__class month__schedule__class--sub ${lesson.first.isEmpty ? 'month__schedule__class--empty' : ''}">
                        ${lesson.first.isEmpty
                            ? `
                            <div class="month__schedule__class__empty"></div>`
                            : `
                            <div class="month__schedule__class__title">
                                <p class="month__schedule__class__name">${lesson.first.name}</p>
                                <p class="month__schedule__class__type">${lessonsType[lesson.first.type]}</p>
                            </div>
                            <p class="month__schedule__class__professor">${lesson.first.professor}</p>
                            ${lesson.first.isOnline 
                                ? `<a class="month__schedule__class__place" href="${lesson.first.place}">Посилання ></a>`
                                : `<p class="month__schedule__class__place">${lesson.first.place}</p>`
                            }
                        `}
                    </div>
                    <div class="month__schedule__class__divider"></div>
                    <div class="month__schedule__class month__schedule__class--sub ${lesson.second.isEmpty ? 'month__schedule__class--empty' : ''}">
                        ${lesson.second.isEmpty
                            ? `
                            <div class="month__schedule__class__empty"></div>`
                            : `
                            <div class="month__schedule__class__title">
                                <p class="month__schedule__class__name">${lesson.second.name}</p>
                                <p class="month__schedule__class__type">${lessonsType[lesson.second.type]}</p>
                            </div>
                            <p class="month__schedule__class__professor">${lesson.second.professor}</p>
                            ${lesson.second.isOnline 
                                ? `<a class="month__schedule__class__place" href="${lesson.second.place}">Посилання ></a>`
                                : `<p class="month__schedule__class__place">${lesson.second.place}</p>`
                            }
                        `}
                    </div>
                    `;

            } else {
                classes = `
                    <div class="month__schedule__class">
                        <div class="month__schedule__class__title">
                            <p class="month__schedule__class__name">${lesson.general.name}</p>
                            <p class="month__schedule__class__type">${lessonsType[lesson.general.type]}</p>
                        </div>
                        <p class="month__schedule__class__professor">${lesson.general.professor}</p>
                        ${lesson.general.isOnline 
                            ? `<a class="month__schedule__class__place" href="${lesson.general.place}">Посилання ></a>`
                            : `<p class="month__schedule__class__place">${lesson.general.place}</p>`
                        }
                    </div>
                `;
            }

            return `
                <div class="month__schedule__time"><p>${time[0]}</p><p>-</p><p>${time[1]}</p></div>
                <div class="month__schedule__class__group ${index % 2 != 0 ? "month__schedule__class__group--red" : ""}">
                    ${classes}
                </div>`;
        });

        for (let y = 0; y < lessons.length; y++) {
            const container = document.createElement("div");
            container.className = "month__schedule__class__container";
            container.innerHTML = lessons[y];

            monthDiv.appendChild(container);
        }
    }

    scheduleContainer.appendChild(monthDiv);
}

function changeMonth(event) {
  const monthId = Number(event.target.id.replace( /^\D+/g, ''));
  if (monthId !== 0 && monthId !== 13) {
    createMonthMarkup(monthId);
  }
};

function addEventsToMonthSelection() {
    const selectionButtons = document.getElementsByClassName("month__selection__icon");

    for (let button of selectionButtons) {
        button.addEventListener("click", changeMonth);
    }
};

function setActiveDay(day) {
    const currentActiveDay = document.getElementsByClassName("month__markup__day--chosen")[0];
    if (currentActiveDay) {
        currentActiveDay.classList.remove("month__markup__day--chosen");
    }
    const activeDay = document.getElementById(`month__markup__day__${day}`);
    activeDay.classList.add("month__markup__day--chosen");
    localStorage.setItem("activeDay", day);
    if (window.innerWidth > 860) {
        createMonthDay();
    } else {
        createMobileMonthDay();
    }
}

function changeActiveDay(event) {
    const chosenDay = event.target.id.replace( /^\D+/g, '');
    setActiveDay(chosenDay);
}

function addEventsToMonthDay() {
    const monthDays = document.getElementsByClassName("month__markup__day__current");
    
    for (let day of monthDays) {
        day.addEventListener("click", changeActiveDay);
    }
}

function createMonthMarkup(monthId) {
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][monthId];
    const monthContainer = document.getElementById("month-calendar");
    monthContainer.innerHTML = "";
    const monthTemplate = monthTemplates[monthId];
    const monthMarkup = document.createElement("div");
    monthMarkup.className = "month__markup";
    let monthMarkupHtml = `
        <div class="month__markup__weekday">пн</div>
        <div class="month__markup__weekday">вт</div>
        <div class="month__markup__weekday">ср</div>
        <div class="month__markup__weekday">чт</div>
        <div class="month__markup__weekday">пт</div>
        <div class="month__markup__weekday">сб</div>
        <div class="month__markup__weekday">нд</div>`;

    if (monthTemplate.previousMonthDays) {
        const previousMonthTemplate = monthTemplates[monthId - 1];
        for (let i = monthTemplate.previousMonthDays - 1; i >= 0; i--) {
            monthMarkupHtml += `
                <div class="month__markup__day month__markup__day--grey">
                    <p class="month__markup__day__number">${previousMonthTemplate.monthDays - i}</p>
                </div>`;
        }
    }

    for (let j = 1; j <= monthTemplate.monthDays; j++) {
        const daySchedule = monthSchedule.find(day => day.id === j);
        if (daySchedule) {
            const lessonsAmount = daySchedule.lessons.reduce((acc, lesson) => {
                if (lesson.isEmpty) {
                    return acc;
                } else {
                    return acc + 1;
                }
            }, 0);

            let lessons = "";

            for (let x = 0; x < lessonsAmount; x++) {
                lessons += '<div class="month__markup__day__lesson"></div>';
            }

            monthMarkupHtml += `
            <div class="month__markup__day month__markup__day__current" id="month__markup__day__${j}">
                <p class="month__markup__day__number">${j}</p>
                <div class="month__markup__day__lessons">
                ${lessons}
                </div>
            </div>`;
        } else {
            monthMarkupHtml += `
            <div class="month__markup__day month__markup__day__current" id="month__markup__day__${j}">
                <p class="month__markup__day__number">${j}</p>
            </div>`;
        }
    }

    if (monthTemplate.nextMonthDays) {
        for (let z = 1; z <= monthTemplate.nextMonthDays; z++) {
            monthMarkupHtml += `
                <div class="month__markup__day month__markup__day--grey">
                    <p class="month__markup__day__number">${z}</p>
                </div>`;
        }
    }

    monthMarkup.innerHTML = monthMarkupHtml;
    monthContainer.appendChild(monthMarkup);
    monthMarkup.style.gridTemplateRows = `20px repeat(${monthTemplate.rows}, 1fr)`;

    const monthSelection = document.createElement("div");
    monthSelection.className = "month__selection";
    monthSelection.innerHTML = `
        <div class="month__selection__icon" id="month-selection-${monthId-1}"><</div>
        ${months[monthId]}
        <div class="month__selection__icon" id="month-selection-${monthId+1}">></div>`;

    monthContainer.appendChild(monthSelection);
    localStorage.setItem("currentMonth", monthId);
    addEventsToMonthSelection();
    addEventsToMonthDay();
};

localStorage.setItem("group", "mit-21");
const currentDay = new Date();
const currentMonthId = currentDay.getMonth() + 1;
createMonthMarkup(currentMonthId);
if (window.innerWidth > 860) {
    setActiveDay(currentDay.getDate());
    createMonthDay();
} 
