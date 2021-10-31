import {
    monthsCase,
    dayCase,
    lessonsType,
    lessonsTime
} from "./constants";
const data = require('./schedule.json');

function createDayMarkup() {
    const todaySection = document.getElementById("today");
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth() + 1;
    const todayDay = todayDate.getDate();
    const currentGroup = localStorage.getItem("group");
    const monthSchedule = data[currentGroup][todayMonth];
    const daySchedule = monthSchedule.find(day => day.id === Number(todayDay));

    const title = document.createElement("div");
    title.className = "today__title";
    title.innerHTML = `
        <div class="today__title__date">
            ${todayDay} ${monthsCase[todayMonth]}
        </div>
        <div class="today__title__day">
            ${dayCase[todayDate.getDay()]}
        </div>`;

    todaySection.appendChild(title);

    const container = document.createElement("div");
    container.className = "today__container";

    if (!daySchedule) {
        const div = document.createElement("div");
        div.className = "today__container__empty";
        div.innerHTML = "<p>Здається, сьогодні пар немає...</p><p>Відпочивай!</p>";
        container.appendChild(div);
    } else {
        const subgroups = document.createElement("div");
        subgroups.classList.add("today__container__item", "today__container__item--subgroups");
        subgroups.innerHTML = `
            <div class="today__container__time">
            </div>
            <div class="today__container__subgroup__title">1 підгрупа</div>
            <div class="today__container__subgroup__title">2 підгрупа</div>
        `;

        container.appendChild(subgroups);


        const lessons = daySchedule.lessons.map((lesson, index) => {
            const time = lessonsTime[lesson.time].split("-");

            let classes = "";

            if (lesson.isEmpty) {
                classes = `
                    <div class="today__container__subgroup today__container__subgroup--full">
                        <hr class="today__container__subgroup--horizontal-line">
                    </div>`;
            } else if (lesson.isSplitted) {
                classes = `
                    <div class="today__container__subgroup ${index % 2 != 0 ? "today__container__subgroup--changedcolor" : ""}">
                        ${lesson.first.isEmpty
                            ? `<hr class="today__container__subgroup--horizontal-line">`
                            :  `
                                <p class="today__container__subgroup__subject">
                                    ${lesson.first.name}
                                </p>
                                <p class="today__container__subgroup__type">
                                    ${lessonsType[lesson.first.type]}
                                </p>
                                <p class="today__container__subgroup__professor">
                                    ${lesson.first.professor}
                                </p>
                                ${lesson.first.isOnline
                                    ? `
                                        <p class="today__container__subgroup__place">
                                            <a class="today__container__subgroup__link"
                                                href="${lesson.first.place}">
                                                Посилання >
                                            </a>
                                        </p>`
                                    : `
                                        <p class="today__container__subgroup__place">
                                            ${lesson.first.place}
                                        </p>`
                                }
                            `
                        } 
                    </div>
                    <hr class="today__container__subgroup--vertical-line ${index % 2 == 0 ? "today__container__subgroup--vertical-line--red" : ""}">
                    <div class="today__container__subgroup ${index % 2 != 0 ? "today__container__subgroup--changedcolor" : ""}">
                        ${lesson.second.isEmpty
                            ? `<hr class="today__container__subgroup--horizontal-line">`
                            :  `
                                <p class="today__container__subgroup__subject">
                                    ${lesson.second.name}
                                </p>
                                <p class="today__container__subgroup__type">
                                    ${lessonsType[lesson.second.type]}
                                </p>
                                <p class="today__container__subgroup__professor">
                                    ${lesson.second.professor}
                                </p>
                                ${lesson.second.isOnline
                                    ? `
                                        <p class="today__container__subgroup__place">
                                            <a class="today__container__subgroup__link"
                                                href="${lesson.second.place}">
                                                Посилання >
                                            </a>
                                        </p>`
                                    : `
                                        <p class="today__container__subgroup__place">
                                            ${lesson.second.place}
                                        </p>`
                                }
                            `
                        }
                    </div>
                `;
            } else {
                classes = `
                    <div
                        class="today__container__subgroup today__container__subgroup--full ${index % 2 != 0 ? "today__container__subgroup--changedcolor" : ""}">
                        <p class="today__container__subgroup__subject">
                            ${lesson.general.name}
                        </p>
                        <p class="today__container__subgroup__type">
                            ${lessonsType[lesson.general.type]}
                        </p>
                        <p class="today__container__subgroup__professor">
                            ${lesson.general.professor}
                        </p>
                        ${lesson.general.isOnline
                            ? `
                                <p class="today__container__subgroup__place">
                                    <a class="today__container__subgroup__link"
                                        href="${lesson.general.place}">
                                        Посилання >
                                    </a>
                                </p>`
                            : `
                                <p class="today__container__subgroup__place">
                                    ${lesson.general.place}
                                </p>`
                        }
                    </div>
                `;
            }

            return `
                <div class="today__container__time">${time[0]}<br>-<br>${time[1]}</div>
                ${classes}
            `;
        });

        for (let y = 0; y < lessons.length; y++) {
            const div = document.createElement("div");
            div.className = "today__container__item";
            div.innerHTML = lessons[y];

            container.appendChild(div);
        }
    }

    todaySection.appendChild(container);
}

createDayMarkup();
