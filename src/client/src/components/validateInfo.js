export default function validateInfo(values){

    /* input validation, 
        very basic may find plugins to handle this*/

    let errors ={}

    if(!values.username.trim()){
        errors.username = "Username Required"
    }

    if(!values.password){
        errors.password = "Password Required"
    }
    else if (values.password.length < 6){
        errors.password = "Password needs to be 6 characters or more"
    }

    return errors;
}