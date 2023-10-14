
const calendrierWeekday = document.querySelector('.calendrier-weekday')
const calendrierContent = document.querySelector('.calendrier-content')
const currentMonth = document.getElementById('currentMonth')
const currentYear = document.getElementById('currentYear')
const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
const nextMonth = document.getElementById('nextMonth')
const prevMonth = document.getElementById('prevMonth')
const yearMonths = [
    {
        "name" : "Janvier",
        "numDays" : 31
    },
    {
        "name" : "Février",
        "numDays" : 28 // Année bixectile pas toujours 28
    },
    {
        "name" : "Mars",
        "numDays" : 30
    },
    {
        "name" : "Avril",
        "numDays" : 31
    },
    {
        "name" : "Mai",
        "numDays" : 30
    },
    {
        "name" : "Juin",
        "numDays" : 31
    },
    {
        "name" : "Juillet",
        "numDays" : 30
    },
    {
        "name" : "Août",
        "numDays" : 31
    },
    {
        "name" : "Septembre",
        "numDays" : 30
    },
    {
        "name" : "Octobre",
        "numDays" : 31
    },
    {
        "name" : "Novembre",
        "numDays" : 30
    },
    {
        "name" : "Décembre",
        "numDays" : 31
    },
]

const date = new Date()
const currentMonthIndex = date.getMonth()
const currentYearNow = date.getFullYear()

//const weekDays1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

export const Calendrier = {
    //initialiser une fonction pour initialiser le calendrier
    initCalendrier: ()=>{
        console.log("ok");

        weekDays.forEach(day => {
            calendrierWeekday.innerHTML += `<div class="weekday-item">${day}</div>`
        });

        Calendrier.displaymonth()
        Calendrier.displayyear()

        const monthNow = yearMonths[currentMonthIndex]
        const numM = monthNow.numDays
        Calendrier.displayday(numM)

        //on gère ces évenement lors de l'initialisation
        prevMonth.onclick = ()=>{
            if (currentMonth.value > 0) {
                currentMonth.value --
            }else{
                currentMonth.value = 11
                currentYear.value --
            }
            Calendrier.updateCalendrier()
            console.log(parseInt(currentMonth.value) + 1);
        }

        nextMonth.onclick = ()=>{
            if (currentMonth.value < 11) {
                currentMonth.value ++
            }else{
                currentMonth.value = 0
                currentYear.value ++
            }
            Calendrier.updateCalendrier()
        }
    },

    displayday: (num)=>{
        console.log(currentMonth.value);
        if (currentMonth.value == 1) {
            // On est en Fevrier ( O c'est janv)
            const year = parseInt(currentYear.value)
            if ( ( (year%4 === 0) && (year%100 > 0) ) || (year%400 === 0) ) {
                //année bissectile
                num = 29
            }
        }

        let day = 1
        calendrierContent.innerHTML = ""
        while (day <= num) {
            calendrierContent.innerHTML += `<div class="day-item">${day} </div>`
            day++
        }

        let firstDayIndexOfMonth = Calendrier.getWeekDay()

        const firstItem = document.querySelector(".calendrier .calendrier-content .day-item:nth-child(1)") 
        firstItem.style.gridColumn = (firstDayIndexOfMonth + 1) + "/" + (firstDayIndexOfMonth +2)
        //let nameOfFirstDay = weekDays[firstDayIndexOfMonth]
        //console.log(nameOfFirstDay);
    },

    displaymonth: ()=>{
        yearMonths.forEach((month, index) => {
            if (index == currentMonthIndex) {
            currentMonth.innerHTML += `<option value="${index}" selected>${month.name}</option>`
            } else {
                
                currentMonth.innerHTML += `<option value="${index}">${month.name}</option>`
            }
        });

        currentMonth.onchange = () =>{
            Calendrier.updateCalendrier()
        }
        
    },
    displayyear: ()=>{
        for (let indexyear = 2050; indexyear >= 1900; indexyear--) {
            if (indexyear === currentYearNow) {
                currentYear.innerHTML += `<option selected>${indexyear} </option>`
            } else {
                currentYear.innerHTML += `<option>${indexyear} </option>`            
            }

            currentYear.onchange = ()=>{
                Calendrier.updateCalendrier()
            }
        }
    },

    //Mise à jour de notre calendrier
    updateCalendrier: ()=>{
        currentMonth.onchange = () =>{
            const month = yearMonths[currentMonth.value]
            const num = month.numDays
            Calendrier.displayday(num)
        }
    },

    getWeekDay: ()=>{
        let weeday
        const d = 1
        const m = parseInt(currentMonth.value) + 1
        const y = parseInt(currentYear.value)
        if (m < 3) {
            //trunc nous permet de recuperer la partie entière
            weeday = ( Math.trunc((23*m)/9) +d +4 +y +Math.trunc((y-1)/4) - Math.trunc((y-1)/100) + Math.trunc((y-1)/400) )%7
        } else {
            weeday = ( Math.trunc((23*m)/9) +d +2 +y +Math.trunc((y)/4) - Math.trunc((y)/100) + Math.trunc((y)/400) )%7
        }

        return weeday
    }
}