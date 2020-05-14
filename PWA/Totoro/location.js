var id = -1;

function getLocation() {
    let button = document.getElementById("location");
    if (id) {
        navigator.geolocation.clearWatch(id);
        id = null;
        button.innerText = "Location";
    } else {
        resetResult();
        id = navigator.geolocation.watchPosition(success, error);
        button.innerText = "Stop Location";
    }
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    showResult(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
}

function error(error) {
    showResult('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    document.getElementById("location").innerText = "Stop Location";
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