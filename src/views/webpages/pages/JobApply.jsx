import useJobDetails from "../../../hooks/jobdetails"
import axios from "/src/services/apiService"
import InputField from "../../../components/fields/InputField";
import {useState} from "react";
import {configureStore} from "@reduxjs/toolkit";
import {setToken, tokenSlice} from "../../../store/index"


function JobApply() {
    const store = configureStore({
        reducer: tokenSlice.reducer
    })

    store.dispatch({type: 'token/setToken', payload: 'Hello world'})

    // console.log(store.getState().value.payload)
    console.log(store.getState())

    store.subscribe((val) => console.log(val))

    let {job, setJob} = useJobDetails()

    const handleSubmit = async (event) => {
        event.preventDefault()
        resetErrors()
        let registered = false
        await register().then(response => {
            registered = true
        }).catch(error => {
            resetErrors(error.response.data)
        })

        if (registered) {
            await login().then(response => {

                console.log(response.data)
                // set data in store
            })

            await applyJob()
        }


    }

    const register = () => {
        let formData = new FormData()
        for (let key in values) {
            formData.append(key, values[key])
        }
        // formData.append('cv', cv)
        return axios.post('register-candidate/', formData)
    }

    const login = () => {
        return axios.post('login/', {email: values.email, password: values.password})
    }

    const applyJob = () => {
        return axios.post('api/apply/', {job_slug: job.slug}, {
            headers: {'Authorization': `Bearer `}
        })
    }

    const resetErrors = (errors = []) => {
        let newInputs = []
        for (let input of inputs) {
            if (errors[input.name]) {
                input.errors = errors[input.name]
            } else {
                input.errors = []
            }
            newInputs.push(input)
        }
        setInputs(newInputs)
    }

    const [inputs, setInputs] = useState([
        {
            label: "Email Address", type: 'email', placeholder: 'Email Address', name: 'email', errors: []
        },
        {
            label: "Full Name", type: 'text', placeholder: 'Full Name', name: 'full_name', errors: []
        },
        {
            label: "Phone", type: 'tel', placeholder: 'Phone Number', name: 'phone', errors: []
        },
        {
            label: "Password", type: 'password', placeholder: 'Password', name: 'password', errors: []
        },
        {
            label: "CV", type: "file", placeholder: "Attach CV", name: "cv", errors: []
        },
        {
            label: "Additional Message",
            type: 'text',
            placeholder: 'Additional Message',
            name: 'additional_message',
            errors: []
        },
        {
            label: "Expected Salary",
            type: 'number',
            placeholder: 'Expected Salary',
            name: 'expected_salary',
            errors: []
        },
    ])


    const [values, setValues] = useState({
        email: '', full_name: '', phone: '', password: '', additional_message: '', expected_salary: '', cv: ''
    })


    const onChange = (e) => {
        if (e.target.files) {
            setValues({...values, [e.target.name]: e.target.files[0]})
        } else {
            setValues({...values, [e.target.name]: e.target.value})
        }
    }

    return (<div className="row justify-content-center mt-3">
        <div className="col-md-6">
            <form onSubmit={handleSubmit} className="card">
                <div className="card-header">
                    Apply For the Position of {job.title}
                </div>
                <div className="card-body">

                    {
                        inputs.map((input, index) => (
                            input.type === 'file' ? <InputField key={index} {...input} onChange={onChange}/> :
                                <InputField key={index} {...input} value={values[input.name]} onChange={onChange}/>
                        ))
                    }

                    {
                        job.additional_fields.map((additionalField, index) => (
                            <InputField key={'h' + index} type="text" placeholder={additionalField.title}
                                        label={additionalField.title}/>
                        ))
                    }

                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>)
}

export default JobApply