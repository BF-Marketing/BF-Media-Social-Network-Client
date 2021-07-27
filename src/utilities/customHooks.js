import { useState } from 'react';

// template for registering, logging users in nad adding data to the database
const useForm = (callback, initialState = {}) => {
    const [ values, setValues ] = useState(initialState);

    function onChange(e){
        setValues({...values, [e.target.name]: e.target.value});
    }

    function onSubmit(e){
        e.preventDefault();        
        callback();
    }

    return {onChange, onSubmit, values}
}
 
export default useForm;