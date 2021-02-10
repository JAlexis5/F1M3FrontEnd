const uitvoer = document.getElementById('uitvoer');
let dataObject;

const uitvoeren = () => {
    // voert data uit in de div met de ID uitvoer
    uitvoer.innerHTML = `<div>${dataObject[0].tijd} </div>`;
    uitvoer.innerHTML += `<div>${dataObject[1].tempBuiten} </div>`;
}

const onstart = () => {
    // data array in dataObject zetten 
    dataObject = energieData;
    // data uitvoeren
    uitvoeren();
}

document.addEventListener('DOMContentLoaded', onstart)