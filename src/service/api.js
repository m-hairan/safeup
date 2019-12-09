import {Config} from '../doc/config';



export function serviceFacebookDetail(token){
    return new Promise(function(resolve, reject) {        
        fetch("https://graph.facebook.com/v2.5/me?fields=first_name,last_name&access_token=" + token, {
        method: 'GET',
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceGetLocationInfo(){
    return new Promise(function(resolve, reject) {        
        fetch("https://ipapi.co/json/", {
        method: 'GET',
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}
export function serviceGetNearbyGuards(phone = '',lat='',lng=''){
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/near-guadrs", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken,
            'X-AUTH-PHONE':phone,
            'X-GEO-LAT': lat,
            'X-GEO-LON':lng
        }
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceRegister(phone = '', device_token = ''){ 
    var params = {
        phone:phone,
        device_token:device_token
    }; 
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/register", {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify(params)
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}
export function serviceConfirmCode(phone,code){ 
    var params = {
        sms_code:code
    }; 
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/confirm", {
        method: 'POST',
        headers: {
            'X-AUTH-PHONE':phone
        },
        body: JSON.stringify(params)
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceProfileUpdate(fname, lname, gender, age){ 
    var params = {
        firstName:fname,
        lastName:lname,
        gender:gender,
        age:age
    }; 
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/user", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken
        },
        body: JSON.stringify(params)
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceGetProfile(){     
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/user", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken
        },
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}


export function servicePhotoUpload(uri, fileName, fileType){ 
    const formData = new FormData();
    //const uriPart = uri.split('.');
    //const fileExtension = uriPart[uriPart.length - 1];
    console.log(Config.AuthToken);
    console.log(uri);
    formData.append('photo', {
        uri: uri,
        name: fileName,
        type: fileType
    })
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/upload-photo", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken,
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
        })
        .then((res)=>{
            if(res.status == '200')
                resolve(res);
            else
                reject(res);
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceInviteMyGuardians(phoneNumber){ 
    var params = {
        phone_number:phoneNumber
    }; 
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/guards/invite", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken
        },
        body: JSON.stringify(params)
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}

export function serviceAddPersonal(phoneNumber){ 
    console.log(phoneNumber);
    console.log("config_"+Config.AuthToken);
    var params = {
        phone_number:phoneNumber
    }; 
    return new Promise(function(resolve, reject) {        
        fetch(Config.BASE_URL+"v1/guards/add-personal", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + Config.AuthToken
        },
        body: JSON.stringify(params)
        })
        .then((response) => {            
            response.json()
            .then((res)=>{
                if(response.status == '200')
                    resolve(res);
                else
                    reject(res);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });    
}









