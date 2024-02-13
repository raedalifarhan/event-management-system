
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ValidationErrors from '../../app/errors/ValidationErrors';
import { observer } from 'mobx-react-lite';

export default observer(function TestErrors() {
    const baseUrl = 'http://localhost:7000/api/';
    const [errors, setErrors] = useState();

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <div className='m-10 p-10 flex flex-col gap-7 bg-slate-200'>
            <h1 className='font-bold text-xl text-red-700'>Test Error component</h1>

            <div className='flex flex-row gap-5'>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleNotFound} >Not Found</button>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleBadRequest} >Bad Request</button>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleValidationError} >Validation Error</button>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleServerError} >Server Error</button>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleUnauthorised} >Unauthorised'</button>
                <button className='bg-orange-400 font-semibold p-3 rounded-md hover:bg-orange-600' onClick={handleBadGuid} >Bad Guid</button>
            </div>
            {errors && <ValidationErrors errors={errors} />}
        </div>
    )
})