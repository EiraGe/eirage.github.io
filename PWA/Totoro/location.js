const State = {
  Idle: Symbol('Idle'),
  WaitingLocation: Symbol('WaitingLocation'),
  WatchingLocation: Symbol('WatchingLocation')
};

var getBtn, watchBtn, mState, id;

function Start() {
    getBtn = document.getElementById("location");
    watchBtn = document.getElementById("watchLocation")

    setState(State.Idle);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
    setState(State.WaitingLocation);
    resetResult()
}

function watchLocation() {
    if (mState == State.Idle) {
        resetResult();
        id = navigator.geolocation.watchPosition(success, error);
        setState(State.WatchingLocation)
    } else {
        navigator.geolocation.clearWatch(id);
        id = null;
        setState(State.Idle)
    }
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    showResult(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    if (mState == State.WaitingLocation)
        setState(State.Idle)
}

function error(error) {
    showResult('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    setState(State.Idle);
}

function appendResult(text) {
    var ul = document.getElementById("result");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
}

function resetResult() {
    result = document.getElementById("result");
    result.innerHTML = "";
}

function setState(state) {
    mState = state
    switch (mState) {
        case State.Idle: {
            getBtn.innerText = "Location"
            watchBtn.innerText = "Watch Location"
            break;
        }
        case State.WaitingLocation: {
            getBtn.innerText = "Waiting"
            watchBtn.innerText = "Watch Location"
            break;
        }
        case State.WatchingLocation: {
            getBtn.innerText = "Location"
            watchBtn.innerText = "Stop"
            break;
        }
    }
}
