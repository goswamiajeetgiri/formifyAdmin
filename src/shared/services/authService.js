import { postDirectCall } from "./commonService";


export const registerUserCall = async (register) => {
    try {
        debugger
        var varString = {
            "Email": register.email,
            "Password": register.password
        };
        return await postDirectCall('sp_registerAdminUser', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}
export const loginUserCall = async (register) => {
    try {
        debugger
        var varString = {
            "Email": register.email,
            "Password": register.password
        };
        return await postDirectCall('proc_Login', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}
export const getUserData = async (data) => {
    try {
        debugger
        var varString = {
            "UserId": data.userId
        };
        return await postDirectCall('proc_getUser', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}
export const getJobData = async (data) => {
    try {
        debugger
        var varString = {
            "JobId": data.JobId
        };
        return await postDirectCall('proc_getAllJobsList', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}
export const addEditJob = async (data) => {
    try {
        debugger
        var varString = {
            "Jobid": data.jobId,
            "JobName": data.jobName,
            "JobDetails": data.jobDescription,
            "JobDetailsUrl": data.jobUrl,
            "JobLastDate": data.JobLastDate
        }
        return await postDirectCall('proc_addEditJob', varString).then((response) => response)
            .catch((error) => {

                console.error(error);
            });
    }
    catch (ex) {
        setTimeout(() => {

        }, 1000);
    }
}

