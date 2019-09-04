class APIRequest {

    constructor(endpoint, responseHandler, errorHandler) {
        this.url = 'http://192.168.0.106:5000/' + endpoint;
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        this.onJsonResponse = responseHandler;
        this.onError = errorHandler;
    }

    call(data) {

      let json_data = JSON.stringify(data);

      console.log("Request to: " + this.url + "\nData: " + json_data);

      fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: json_data
        })
            .then(response => {

                console.log("Response status: " + response.status);

                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                }
                else {
                    throw response;
                }
            })
            .then(this.onJsonResponse)
            .catch(this.onError);
    }
}

export default APIRequest;