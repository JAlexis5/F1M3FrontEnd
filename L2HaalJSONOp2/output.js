const uitvoer = document.getElementById('uitvoer');
let dataObject;
const JSONknop = document.getElementById('haalJSON');
const URLJSON = 'https://gist.githubusercontent.com/Theo-denBlanken/193d989a2aab328f847f4357e7171dc5/raw/1ca3b05253dee0dac348b9ded4ada8a64d97ff5e/huisDataa.json'

JSONknop.addEventListener('click', () => {
    JSONknop.style.display = "none";
    const vraagServ = new XMLHttpRequest();
    vraagServ.onreadystatechange = () => {
        if (vraagServ.readyState==4 && vraagServ.status==200) {
            dataObject = JSON.parse(vraagServ.responseText);
            console.log(dataObject);
            uitvoeren();
        };
    };
    vraagServ.open('GET', URLJSON, true);
    vraagServ.send();
}
)

const dagWeekDisplay = (num) => {
    switch (num) {
        case 0: return 'zondag'; break
        case 1: return 'maandag'; break
        case 2: return 'dinsdag'; break
        case 3: return 'woensdag'; break
        case 4: return 'donderdag'; break
        case 5: return 'vrijdag'; break
        case 6: return 'zaterdag'; break
        default: return num;
    }
}

const maandDisplay = (num) => {
    switch (num) {
        case 0: return 'januari'; break
        case 1: return 'februari'; break
        case 2: return 'maart'; break
        case 3: return 'april'; break
        case 4: return 'mei'; break
        case 5: return 'juni'; break
        case 6: return 'juli'; break
        case 7: return 'augustus'; break
        case 8: return 'september'; break
        case 9: return 'oktober'; break
        case 10: return 'november'; break
        case 11: return 'december'; break
        default: return num;
    }
}

const maakDatum = (num) => {
    if (typeof(num) == 'string') {
        num = Date.parse(num);
    };

    let datum = new Date(num);

    let minuten = datum.getMinutes();
    let uren = datum.getHours();
    let dagWeek = datum.getDay();
    let dagMaand = datum.getDate();
    let maand = datum.getMonth();
    let jaar = datum.getFullYear();
    if (minuten < 10) {
        minuten = '0' + minuten;
    }
    if (uren < 10) {
        uren = '0' + uren;
    }

    return `${dagWeekDisplay(dagWeek)} <br>
    ${dagMaand} ${maandDisplay(maand)} ${jaar} ${uren}:${minuten}`
}

const uitvoeren = () => {
    // voert data uit in de div met de ID uitvoer
    let html = "";
    dataObject.forEach( obj => {
        html += `<div class="rij">`;
        html += `<div>${maakDatum(obj.tijd)}</div>`;
        html += `<div>${obj.tempBuiten} &deg;C</div>`;
        html += `<div>${obj.tempBinnen} &deg;C</div>`;
        html += `<div>${obj.tempGewenst} &deg;C</div>`;
        if(obj.tempGewenst > obj.tempBinnen) {
            html += `<div> <img class="icon" src="assets/vlam.svg" alt="CV aan"> </div>`;
        } else {
            html += `<div> <img class="icon" src="assets/vlamUit.svg" alt="CV uit"></div>`
        }
        if(obj.lichtKamer) {
            html += `<div> <img class="icon" src="assets/lampAan.svg" alt="Lamp aan"> </div>`;
        } else {
            html += `<div> <img class="icon" src="assets/lampUit.svg" alt="Lamp uit"> </div>`;
        }
        if(obj.lichtBuiten) {
            html += `<div> <img class="icon" src="assets/lampAan.svg" alt="Lamp aan"> </div>`;
        } else {
            html += `<div> <img class="icon" src="assets/lampUit.svg" alt="Lamp uit"> </div>`;
        }
        html += `</div>`;   
    });

    uitvoer.innerHTML = html;
}

const onstart = () => {
    // data array in dataObject zetten 
    dataObject = energieData;
    // data uitvoeren
    uitvoeren();
}

document.addEventListener('DOMContentLoaded', onstart)

