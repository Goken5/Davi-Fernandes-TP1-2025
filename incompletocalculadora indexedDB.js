const DB_NAME = 'MyDatabase';
const DB_VERSION = 2;
const STORE_NAME = 'MyObjectStore';

let db;

// Open or create the database
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully");
    mostrarRegistros();
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        console.log("Object store created");
    }
};

// Add data to the object store
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const addRequest = objectStore.add({ key: key, value: value });

    addRequest.onsuccess = function() {
        console.log("Data added successfully");
        document.getElementById('keyInput').value = '';
        document.getElementById('valueInput').value = '';
        mostrarRegistros();
    };

    addRequest.onerror = function() {
        console.error("Error adding data");
    };
});

function mostrarRegistros() {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output

    objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            outputDiv.innerHTML += `<p>Chave: ${cursor.value.key}, Valor: ${cursor.value.value}</p>`;
            cursor.continue();
        } else {
            console.log("All data retrieved");
        }
    };
}
let object = {};
function atualizaHistorico(){
    historico = document.getElementById('historico');
    let li = document.createElement('li');
    li.innerHTML = `${object.operando1} ${object.operacao} ${object.operando2} = ${object.resultado}`;
    historico.appendChild(li);
            
    }
function adicao() {
    object.operando1 = parseFloat(document.getElementById('a').value);
    object.operando2 = parseFloat(document.getElementById('b').value)
    object.operacao = " + "
    object.resultado = (object.operando1 + object.operando2);
    resultado.innerHTML = object.operando1 + object.operacao + object.operando2 + " = " + object.resultado;
    document.getElementById('a').value = object.resultado;
    document.getElementById('b').value = '';
   atualizaHistorico();
    }
function subtracao() {
    object.operando1 = parseFloat(document.getElementById('a').value);
    object.operando2 = parseFloat(document.getElementById('b').value)
    object.operacao = " - "
    object.resultado = (object.operando1 - object.operando2);
    resultado.innerHTML = object.operando1 + object.operacao + object.operando2 + " = " + object.resultado;
    document.getElementById('a').value = object.resultado;
    document.getElementById('b').value = '';
    atualizaHistorico();
    }
function multiplicacao() {
    object.operando1 = parseFloat(document.getElementById('a').value);
    object.operando2 = parseFloat(document.getElementById('b').value)
    object.operacao = " x "
    object.resultado = (object.operando1 * object.operando2);
    resultado.innerHTML = object.operando1 + object.operacao + object.operando2 + " = " + object.resultado;
    document.getElementById('a').value = object.resultado;
    document.getElementById('b').value = '';
    atualizaHistorico();
    }
function divisao() {
    object.operando1 = parseFloat(document.getElementById('a').value);
    object.operando2 = parseFloat(document.getElementById('b').value)
    object.operacao = " / "
    object.resultado = (object.operando1 / object.operando2);
    resultado.innerHTML = object.operando1 + object.operacao + object.operando2 + " = " + object.resultado;
    document.getElementById('a').value = object.resultado;
    document.getElementById('b').value = '';
    atualizaHistorico();
}
