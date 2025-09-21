export const BaseUrl = "http://localhost:2006/";      // since 80% of url is same so we keep that as baseurl 
export function callapi(reqmethod, url,data, responseHandler)  // to integrate spring boot with front-end we use callapi function
{
    // based on this option variable we are expecting to send or receive data
    var option;
    if(reqmethod === "GET" || reqmethod === "DELETE") 
        option={method: reqmethod, headers: {'content-type':'application/json'}};
    else 
        option= {method: reqmethod,headers: {'content-type':'application/json'}, body:data};
//    body data     
// fetch function to call api
    fetch(url,option)
        .then(response => {
            if(!response.ok)
                throw new Error(response.status +" "+response.statusText);
        return response.text();
        })
        .then(data=>responseHandler(data))
        .catch(error=>alert(error));
}
// storing generated token into browser cookies
export function setSession(sessionName, sessionValue, expiryDate){
    let d = new Date();                                 // creating object to date class
    d.setTime(d.getTime() + expiryDate *86400000);      // set expiry date of session details stored in cookie
    document.cookie = `${sessionName}=${sessionValue};expires=${d.toUTCString()};path=/;secure`;                   // to store session details in cookie
}
// to get token details from cookie
export function getSession(sessionName){
    let decodedCookie = decodeURIComponent(document.cookie);                      // to decode the cookie for security purpose
    let cookieData = decodedCookie.split(';');
    for(let x in cookieData)
        if(cookieData[x].includes(sessionName))
            return cookieData[x].substring(cookieData[x].indexOf(sessionName) + sessionName.length + 1);
    return "";

}