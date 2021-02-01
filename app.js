// Nav Bar Disappear

let scrollPos = window.pageYOffset
window.onscroll = function () {
    let newScrollPos = window.pageYOffset
    if (scrollPos > newScrollPos) {
        document.getElementById('navBar').style.top = '0'
    } else {
        document.getElementById('navBar').style.top = '-80px'
    }
    scrollPos = newScrollPos
}


// Display Data Call 1


const url = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=cumulative&format=json&select=kepoi_name,kepler_name,koi_disposition,koi_pdisposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff"

const getPlanets = async () => {
    try {
        const res = await axios.get(url)
        let data = res.data
        removeData()
        showPlanetData(data)
    } catch (err) {
        console.log(err);
    }
}


// Display Data Call 2


const earthFilterUrl = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json&where=koi_prad>0.6 and koi_prad<1.5 and koi_teq>180 and koi_teq<303 and koi_pdisposition like 'CANDIDATE'&select=kepoi_name,kepler_name,koi_disposition,koi_pdisposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff"

const getEarthFilterPlanets = async () => {
    removeData()
    try {
        const earthFilterRes = await axios.get(earthFilterUrl)
        let earthFilterData = earthFilterRes.data
        // console.log(earthFilterData);
        showPlanetData(earthFilterData)
    } catch (err) {
        console.log(err);
    }
}


// Display Data Call 3 


const habitableFilterUrl = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json&where=koi_teq>180 and koi_teq<303 and koi_insol>0.25 and koi_insol<2.2 and koi_pdisposition like 'CANDIDATE'&select=kepoi_name,kepler_name,koi_disposition,koi_pdisposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff"

const getHabitableFilterPlanets = async () => {
    removeData()
    try {
        const habitableFilterRes = await axios.get(habitableFilterUrl)
        let habitableFilterData = habitableFilterRes.data
        // console.log(earthFilterData);
        showPlanetData(habitableFilterData)
    } catch (err) {
        console.log(err);
    }
}


getPlanets()


// Remove Data 


const removeData = () => {
    const rmPlanets = document.querySelector('tbody')
    while (rmPlanets.lastChild) {
        rmPlanets.removeChild(rmPlanets.lastChild)
    }
}


// Filter Listeners for Data


const resetFilterData = document.querySelector('.reset')
resetFilterData.addEventListener('click', getPlanets)

const earthFilterData = document.querySelector('.earth')
earthFilterData.addEventListener('click', getEarthFilterPlanets)

const habitableFilterData = document.querySelector('.habitable')
habitableFilterData.addEventListener('click', getHabitableFilterPlanets)


// Append data to the content container


const showPlanetData = (planetData) => {
    planetData.forEach(planet => {
        const planetInfo = `
        <tr>
            <td>${planet.kepoi_name}</td>
            <td>${planet.kepler_name}</td>
            <td>${planet.koi_period}</td>
            <td>${planet.koi_teq}</td>
            <td>${planet.koi_insol}</td>
            <td>${planet.koi_prad}</td>
            <td>${planet.koi_steff}</td>
            <td>${planet.koi_disposition}</td>
            <td>${planet.koi_pdisposition}</td>
        </tr>
        `
        let dataContainer = document.querySelector('tbody')
        dataContainer.insertAdjacentHTML('beforeend', planetInfo)
    });
}


// Search Feature Functions
//https://www.w3schools.com/howto/howto_js_filter_table.asp


function searchPlanets () {
    let input = document.querySelector('#tableSearch')
    let filter = input.value.toUpperCase()
    let table = document.querySelector('#dataTable')
    tr = table.getElementsByTagName('tr')

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]
        if(td) {
            txtVal = td.textContent || td.innerText
            if (txtVal.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ''
            } else {
                tr[i].style.display = 'none'
            }
        }   
    } 
}


