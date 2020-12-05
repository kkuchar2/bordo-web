import {notifyError} from "util/Util.jsx";

export const client = async (endpoint, { body, ...customConfig } = {}) => {
    const headers = { 'Content-Type': 'application/json' }

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
        if (response.ok) {
            return data
        }
        throw new Error(response.statusText)
    } catch (err) {
        notifyError("Error: could not connect to server.");
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = (endpoint, customConfig = {})  => client(endpoint, { ...customConfig, method: 'GET' })

client.post = (endpoint, body, customConfig = {}) => client(endpoint, { ...customConfig, body })