import { postDirectCall } from "./commonService";





export const getDLRequestsData = async (data) => {
    try {
        debugger
        var varString = {
            "JobId": data.JobId
        };
        return await postDirectCall('proc_getAll_DLRequests', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}


export const getUserFormsRequestsData = async (data) => {
    try {
        debugger
        var varString = {
            "JobId": data.JobId
        };
        return await postDirectCall('proc_getAll_UserFormsRequests', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}