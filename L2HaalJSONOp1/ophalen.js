const url = 'https://gist.githubusercontent.com/Theo-denBlanken/ed9551298618eb05ad01b838b3bf32b5/raw/c8c1fed36793bdd6fd69ba6ee815c263a61118c3/boekenTheo.json';

// callback functie
const processData = (obj) => {
    let replacement = "";

    obj.forEach(boek => {
        replacement += `<img style="width: 100px" src="${boek.cover}" alt="${boek.titel}">`;
    });
    document.body.innerHTML = replacement;
}

// XMLHttpRequest-object maken
const request = new XMLHttpRequest();
request.onreadystatechange = () => {
    console.log(`readyState: ${request.readyState}, Status: ${request.status}`);
    if(request.readyState==4 && request.status==200) {
        console.log(JSON.parse(request.responseText));
        let data = JSON.parse(request.responseText);
        processData(data);
    }
}

request.open('GET', url, true);
request.send();

// einde script opdracht
console.log('Dit wordt uitgevoerd nadat de XMLHttpRequest wordt verzonden.');