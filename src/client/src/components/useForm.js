/* custom hook to hadle errors and changes to form */

import { useState, useEffect } from "react";

const useForm = (callback, validate, login) => {
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });

        console.log(values);
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values))
        setIsSubmitting(true);
        //console.log(login);
        login(values.username, values.password);
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