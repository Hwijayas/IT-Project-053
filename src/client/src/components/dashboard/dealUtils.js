API_URL= 'bits-please-api.herokuapp.com/user/' || 'localhost:5000/user/';
headers = {
    Authorization: getToken(),
    'Content-Type': 'application/json',
};

const getDeals = (async() =>{
    const args = {
        method: 'GET',
        headers:headers
    }
    const response;
    fetch(API_URL+'deal', args).then(
        res => response = res.json()
        ).catch(
            err => console.log(err.message)
        );
    return response;
});

const updateDeal = (async (dealId, newDeal) =>{
    const args = {
        method:'PUT',
        headers:headers,
        body: JSON.stringify(newDeal)
    }
    try{
        const response = await fetch(API_URL+'deal/'+dealId, args);
        return await response.json();
    }catch(err){
        return err;
    }
});

const createDeal = (async(newDeal)=>{
    const args = {
        method:'POST',
        headers:headers,
        body: JSON.stringify(newDeal)
    }
    try{
        const response = await fetch(API_URL+'deal/', args);
        return await response.json();
    }catch(err){
        return err;
    }
});
const deleteDeal = (dealId => {
    const args = {
        method:'DELETE',
        headers:headers
    }
    const response = await fetch(API_URL+'deal/'+id, args);


}); 

export {getDeals, updateDeal, createDeal, deleteDeal};