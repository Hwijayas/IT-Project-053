const authUrl = 'bits-please-api.herokuapp.com/protected';
const getToken = () => localStorage.getItem('token');

const isLoggedIn = ()=> {
    const token = getToken();
    let authResponse = false;
    if(!token){
        authResponse=false;
        return authResponse;
    }
    const args = {
        method: 'GET',
        headers:{
            Authorization: token,
            'Content-Type': 'application/json',
        },
    };
    fetch(authUrl, args).then(res =>{
        if(res.json.success){ authResponse=true;}
    }).catch(err => console.log(err.message));
    console.log('auth checked, status: '+authResponse);
    return authResponse;
};
export {isLoggedIn};