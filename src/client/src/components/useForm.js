/* custom hook to hadle errors and changes to form */

import { useState, useEffect } from "react";

const useForm = (callback, validate, login_register) => {
    const [values, setValues] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    //handle changes on input field
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });

    };

    //check for errors if any then submit and call login
    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values))
        setIsSubmitting(true);
        
    };
    
    useEffect(
        () => {
        console.log(errors)

        //perform login/register function when no errors
        if(Object.keys(errors).length === 0 && isSubmitting){
            login_register(values);
        }

        },
        [errors]
    );

    return {handleChange, values, handleSubmit, errors};
};

export default useForm;