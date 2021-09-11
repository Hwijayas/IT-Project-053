/* custom hook to hadle errors and changes to form */

import { useState, useEffect } from "react";

const useForm = (callback, validate, login) => {
    const [values, setValues] = useState({
        username: "",
        password: ""
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

        console.log(values);
    };

    //check for errors if any then submit and call login
    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values))
        setIsSubmitting(true);
        // console.log(values);
        login(values);
    };
    
    useEffect(
        () => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }

        },
        [errors]
    );

    return {handleChange, values, handleSubmit, errors};
};

export default useForm;