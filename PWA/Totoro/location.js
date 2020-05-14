var id = -1;

function getLocation() {
    if (id) {
        navigator.geolocation.clearWatch(id);
        id = null;
    } else {
        resetResult();
        id = navigator.geolocation.watchPosition(success, error);
    }
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    showResult(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
}

function error(error) {
    showResult('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function showResult(text) {
    result = document.getElementById("result");
    result.innerHTML += "<li>" + text + "</li>";
    result.style.display = "block";
}

function resetResult() {
    result = document.getElementById("result");
    result.innerHTML = "";
    result.style.display = "none";
}