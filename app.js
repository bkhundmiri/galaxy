const url = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=cumulative&format=json&select=kepoi_name,kepler_name,koi_disposition,koi_pdisposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff"

const getPlanets = async () => {
    try {
        const res = await axios.get(url)
        let data = res.data
        // let planetData = data.slice(1, 101)
        console.log(data);
        showPlanetData(data)
    } catch (err) {
        console.log(err);
    }
}
// getPlanets()


// Event Listner for the data


const showDataButton = document.querySelector('.showData')
showDataButton.addEventListener('click', getPlanets)

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
