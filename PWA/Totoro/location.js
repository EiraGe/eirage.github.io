function getLocation() {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        result(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }

    function error(error) {
        result(textContent = 'code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    if (!navigator.geolocation) {
        result(status.textContent = 'Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
function result(res) {
    alert(res);
}