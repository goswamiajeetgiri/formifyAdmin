import { environment } from "../../environments/environment";
export const GetHost = () => {
    var Host = environment.api.url;
    return Host;
};


export const postDirectCall = async (route, data, type) => {
    debugger
    return await fetch(GetHost() + route, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then((response) => {
            debugger
            if (response.status === 401) { return 'Unauthorized' }
            else { return response.json(); }
        })
        .catch((error) => {
            return error;
        });
}