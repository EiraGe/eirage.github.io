function getLocation() {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        showResult(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }

    function error(error) {
        showResult('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function showResult(text) {
    result = document.getElementById("result");
    result.innerHTML += "<li>" + text + "</li>";
    result.style.display = "block";
}
