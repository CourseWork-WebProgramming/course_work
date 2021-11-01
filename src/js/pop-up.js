const openPopUp = document.getElementById('open_pop_up');
const closePopUp = document.getElementById('close_pop_up');
const popUp = document.getElementById('pop_up');
const hideNoGroup = document.getElementById('no-group');
const buttonGetGroup = document.getElementById('pop-up-get-group');
const group = document.getElementById('select-group');

openPopUp.addEventListener('click', () => {
    popUp.classList.add('active');
    hideNoGroup.classList.add('nonvisible');
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active');
    hideNoGroup.classList.remove('nonvisible');
})

function onGroupChange() {
    localStorage.setItem("group", this.value);
}

group.addEventListener('change', onGroupChange);

buttonGetGroup.addEventListener('click', () => {
    const group = localStorage.getItem("group");
    if (group) {
        fetch(`https://my-json-server.typicode.com/CourseWork-WebProgramming/course_work/${group}`)
        .then(response => response.json())
        .then((about) => {console.log('data', about)})
        .catch(e => {
            console.log(e)
        });
    }
})

localStorage.setItem("group", "");
