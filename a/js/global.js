var coordPlus = [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
];

var coordCorner = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 }
];
var coordCircle = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
];

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var download_csv_using_blob = function (file_name, content) {
    var csvData = new Blob([content], { type: 'text/plain' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        window.navigator.msSaveOrOpenBlob(csvData, file_name);
    } else { // for Non-IE (chrome, firefox etc.)
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var csvUrl = URL.createObjectURL(csvData);
        a.href = csvUrl;
        a.download = file_name;
        a.click();
        URL.revokeObjectURL(a.href)
        a.remove();
    }
};

function writeDebug(str) {
    document.getElementById("debug").value = str;
    document.getElementById("debug").style.display = "";
}

/*
function saveToJsonFile(fileName, variableName, data) {
    var str = "";

    str += "{\"" + variableName + "\" : " + JSON.stringify(data) + "}";

    var file = new Blob([str], { type: 'text/plain' });

    download_csv_using_blob(fileName, file);
}
*/