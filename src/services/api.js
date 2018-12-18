export async function apiCall (method, url, headers, data){
    let sendHeaders = {'Content-Type':'application/json', 'Accept': 'application/json', ...headers}; 
    let callParams = {  method, headers: sendHeaders }
    if(data){callParams.body = JSON.stringify(data)} 
    return fetch("https://recipe-app-99.herokuapp.com/" + url, callParams)
    .then(resp => { return resp.json(); }) 
} 