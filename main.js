const palavrasCruasInput = document.querySelector('#palavras-cruas-input');
const complementosInput = document.querySelector('#complementos-input');
const geradasElement = document.querySelector('#geradas-element');
const qntGeradasElement = document.querySelector('#quantidade-gerada');

let results;

function preencherGeradasDOM(geradas) {
    geradasElement.innerHTML = '';

    geradas.forEach(gerada => {
        let geradaElement = document.createElement('li');
        geradaElement.className = "list-group-item d-flex justify-content-between lh-sm"
        geradaElement.innerHTML =
        ` 
            <div>
                <h6 class="my-0">${gerada}</h6>
            </div>
        `
    
        geradasElement.appendChild(geradaElement);
    });
}

function gerar() {
    results = [];

    let palavrasCruas = palavrasCruasInput.value;
    let complementos = complementosInput.value;

    let palavraschaves = palavrasCruas.split(', ');
    let targetwords = complementos.split(', ');

    for (var i = 0; i < palavraschaves.length; i++) {
        for (var j = 0; j < targetwords.length; j++) {
            if(palavraschaves[i] === "" || targetwords[j] === "") return;
            let thisResult = palavraschaves[i] + " " + targetwords[j]
            results.push(thisResult);
        }
    }

    preencherGeradasDOM(results)
    qntGeradasElement.innerText = results.length;
}

function copiar(){
    navigator.clipboard.writeText(results.join(', ')).then(function() {
    console.log('Copiado');
    }, function(err) {
    console.error('Erro:', err);
    });
}

function colar(input){
    let inputElement;
    switch(input){
        case 'cruas':
            inputElement = palavrasCruasInput;
            break
        case 'complementos':
            inputElement = complementosInput;
            break
    }
    navigator.clipboard.readText().then(text => {
        inputElement.value = text;
    })
}