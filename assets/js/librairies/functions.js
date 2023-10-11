
const calendrierWeekday = document.querySelector('.calendrier-weekday')
const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

export const Calendrier = {
    //initialiser une fonction pour initialiser le calendrier
    initCalendrier: ()=>{
        console.log("ok");

        weekDays.forEach(day => {
            calendrierWeekday.innerHTML += `<div class="weekday-item">${day} </div>`
        });
    },

    displayday: ()=>{
        return 'ok'
    }
}