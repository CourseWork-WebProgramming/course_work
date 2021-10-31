const openPopUp = document.getElementById('open_pop_up');
const closePopUp = document.getElementById('close_pop_up');
const popUp = document.getElementById('pop_up');
const hideNoGroup = document.getElementById('no-group');

openPopUp.addEventListener('click', ()=> {
    popUp.classList.add('active');
    hideNoGroup.classList.add('nonvisible');
})

closePopUp.addEventListener('click', ()=> {
    popUp.classList.remove('active');
    hideNoGroup.classList.remove('nonvisible');
})