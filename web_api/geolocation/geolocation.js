function curSuccess(pos) {
    const  coords = pos.coords;

    console.log(`Latitude: ${coords.latitude}`);
    console.log(`Longitude: ${coords.longitude}`);
    console.log(`Accuracy: ${coords.accuracy} meters`);
}

function curError(err) {
    console.log(`Error: ${err.code} - ${err.message}`);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

navigator.geolocation.getCurrentPosition(curSuccess, curError, options);

const id = navigator.geolocation.watchPosition(curSuccess, curError, options);