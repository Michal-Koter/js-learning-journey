// Handle http errors with fetch
fetch("http://httpstat.us/404")
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response;
    })
    .then(() => console.log("success"))
    .catch(error => console.log(error));

// Handle specific status code
fetch("http://httpstat.us/404")
    .then(response => {
        if (response.status === 404) {
            throw new Error("Not found");
        } else if (response.status === 500) {
            throw new Error("Server error");
        } else if (response.status !== 200) {
            throw new Error("Request error");
        }
        return response;
    })
    .then(() => console.log("success"))
    .catch(error => console.log(error));