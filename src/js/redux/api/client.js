export const client = async (endpoint, {body, ...customConfig} = {}) => {
    const headers = {'Content-Type': 'application/json'}

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    let data

    try {

        const response = await window.fetch(endpoint, config)

        data = await response.json()

        console.log(data)

        if (response.ok) {
            return {
                httpCode: response.status,
                json: data
            }
        }
        return {
            httpCode: response.status,
            json: data
        };
    }
    catch (err) {
        return {
            httpCode: response.status,
            json: []
        };
    }
}

client.get = (endpoint, customConfig = {}) => client(endpoint, {...customConfig, method: 'GET'})

client.post = (endpoint, body, customConfig = {}) => client(endpoint, {...customConfig, body})