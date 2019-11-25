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

export function serviceRegister(phone = ''){ 
    var params = {
        phone:phone
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









