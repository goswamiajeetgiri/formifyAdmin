
let ServiceToken='key=AAAAsBMm8Sk:APA91bF0iIzxCX8PqMae6LA42Xc0uHFwQPbIq279H8o8p53p4JWqTtIiWAxDJbiR7IHjKqtrUDsJQv-505N0SMQ3WbvIp9wK8bgSA9CqqqCeb4ppFgT_7nYTGf8CFCVn8QG-i6BrpmbU'
let NotificationApiUrl='https://fcm.googleapis.com/fcm/send'
export const  _sendPushNotification= async(data,ClientToken) => {
let Payload={
   
        to: "ej11uWCYR7qf98VIpDv5sv:APA91bEhP5xOFfo1hP2ejpFzXJav6v07TEv3Liy_nOFJwKKQIQ6B5PwY8cRhSHv6tkSfaH1lE42cf0TVjWTZY7SOJ_-EXZ4pv7i008UMGoNroprHh04DnkXfEEyIOO2Exd0h5263HHmq",
        notification : {
            body : "Body of Your Notification",
            title: "Title of Your Notification"
        }
       
}

let headers= {
    "Authorization":ServiceToken,
    "Content-Type": "application/json",
    
    }
    try {
        debugger;
      const res = await fetch(NotificationApiUrl,headers,Payload
        
       // method: 'POST',

      )
      console.log(JSON.stringify(res))
      debugger;
      return res;
    }
    catch (error) {
 alert(error)
      console.log(error);
      return error;
    }
  
  }


  export const _sendNewPushNotification = async (proc,token,data) => {
    let Payload={
   
        to: "ej11uWCYR7qf98VIpDv5sv:APA91bEhP5xOFfo1hP2ejpFzXJav6v07TEv3Liy_nOFJwKKQIQ6B5PwY8cRhSHv6tkSfaH1lE42cf0TVjWTZY7SOJ_-EXZ4pv7i008UMGoNroprHh04DnkXfEEyIOO2Exd0h5263HHmq",
        notification : {
            body : "Body of Your Notification",
            title: "Title of Your Notification"
        }
       
}
    return await fetch('https://fcm.googleapis.com/fcm/send',{
        headers: {
            'Content-Type': 'application/json',
            'access-token':ServiceToken,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
         method: "POST",
            body: JSON.stringify(Payload)
         })
      .then((response) => {      
        debugger;    
        if(response.status===401)
        
        {  return  'Unauthorized' }
        else
        {  
            return   response.json();
           
        }
    })         
      .catch((error) => {
          return error;
         
      });
   }  