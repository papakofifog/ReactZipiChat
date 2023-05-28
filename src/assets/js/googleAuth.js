import {SendPostWithoutHeader} from './handleRequest.js'
let loginGoogle= document.querySelector('#signin-button')

gapi.load('auth2', function() {
    gapi.auth2.init({
        client_id: '157008517418-l4sv1j93cg0l5sups7iqrttm4o5ofauo.apps.googleusercontent.com',
        scope: 'openid'
    });
});

loginGoogle.addEventListener('click', function(){
    gapi.auth2.getAuthInstance().signIn();
})

gapi.auth2.getAuthInstance().isSignedIn.listen( async function(isSignedIn) {
    if (isSignedIn) {
        let authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
        let code = authResponse.code;
        // send the code to your server to exchange it for an access token
        let accessToken= await sendCodeForAccessToken(code);
        console.log(accessToken)

    }

});

async function sendCodeForAccessToken(code){
    let url= 'http://localhost:3000/api/googleLogin'
    let body=code;

    let accessToken = await SendPostWithoutHeader(url,body);

    return accessToken;


}

    
