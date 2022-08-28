import useJobDetails from "../../../../hooks/jobdetails"
import axios from "/src/services/apiService"
import InputField from "../../../../components/fields/InputField";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../../../store/auth/token";
import resetErrors from "../../../../components/fields/error-reset";


function JobApply() {
    // redux state
    let token = useSelector((state) => state.token.value)
    let dispatch = useDispatch()

    // third party state
    let {job} = useJobDetails()

    // functions for HTTP request
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!token) {
            resetErrors(registration, setRegistration)
            let registered = false
            await register().then(response => {
                registered = true

            }).catch(error => {
                resetErrors(registration, setRegistration, error.response.data)
            })

            if (registered) {
                await login().then(response => {
                    dispatch(setToken(response.data._token))
                })
            }
        } else {
            await applyJob()
        }

    }

    const register = () => {
        let formData = new FormData()
        for (let key in registration) {
            let field = registration[key]
            if (field.type === 'file') {
                formData.append(field.name, field.file)
            } else {
                formData.append(field.name, field.value)
            }
        }
        return axios.post('register-candidate/', formData)
    }

    const login = () => {
        let data = {
            email: registration.email.value,
            password: registration.password.value
        }
        return axios.post('login/', data)
    }

    const applyJob = () => {
        resetErrors(jobApply, setJobApply)
        resetErrors(additionalFields, setAdditionalFields)
        return axios.post('apply/', {
            job_slug: job.slug,
            expected_salary: jobApply.expected_salary.value,
            additional_message: jobApply.additional_message.value,
            additional_fields: Object.values(additionalFields).map((element) => {
                return element.value
            })
        }, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(({data}) => {
            history.push('/job-apply-success')
        }).catch(error => {
            resetErrors(jobApply, setJobApply, error.response.data)
            resetErrors(additionalFields, setAdditionalFields, error.response.data)
            if (error.response.status == 403) {
                alert(error.response.data.message)
            }
        })
    }

    // Local States
    const [registration, setRegistration] = useState({
        email: {
            label: "Email Address",
            type: 'email',
            placeholder: 'Email Address',
            name: 'email',
            value: '',
            errors: []
        },
        full_name: {
            label: "Full Name",
            type: 'text',
            placeholder: 'Full Name',
            name: 'full_name',
            value: '',
            errors: []
        },
        phone: {
            label: "Phone",
            type: 'tel',
            placeholder: 'Phone Number',
            name: 'phone',
            value: '',
            errors: []
        },
        password: {
            label: "Password",
            type: 'password',
            placeholder: 'Password',
            name: 'password',
            value: '',
            errors: []
        },
        cv: {
            label: "CV",
            type: "file",
            placeholder: "Attach CV",
            name: "cv",
            file: null,
            errors: []
        },
    })

    const onChangeRegistration = (e) => {
        if (e.target.files) {
            setRegistration({
                ...registration,
                [e.target.name]: {...registration[e.target.name], file: e.target.files[0], errors: []}
            })
        } else {
            setRegistration({
                ...registration,
                [e.target.name]: {...registration[e.target.name], value: e.target.value, errors: []}
            })
        }

    }

    const [jobApply, setJobApply] = useState({
        additional_message: {
            label: "Additional Message",
            type: 'text',
            placeholder: 'Additional Message',
            name: 'additional_message',
            value: '',
            errors: []
        },
        expected_salary: {
            label: "Expected Salary",
            type: 'number',
            placeholder: 'Expected Salary',
            name: 'expected_salary',
            value: '',
            errors: []
        },
    })

    /**
     * Additional Field state initialize with empty object
     * the filed will be loaded by initializeAdditionalFields on component load
     */
    const [additionalFields, setAdditionalFields] = useState({})

    /**
     * Initialize Additional Fields from the Job
     */
    const initializeAdditionalFields = () => {
        let fields = {}
        job.additional_fields.map((element, index) => {
            fields[`additional_fields.${index}`] = {
                label: element.title,
                type: 'text',
                placeholder: element.title,
                name: `additional_fields.${index}`,
                value: '',
                errors: []
            }
        })
        setAdditionalFields(fields)
    }

    // will initialize additional fields once the component on load
    useEffect(() => {
        initializeAdditionalFields()
    }, [job])


    return (<div className="row justify-content-center mt-3">
            <div className="col-md-6">
                <form onSubmit={handleSubmit} className="card">
                    <div className="card-header">
                        Apply For the Position of {job.title}
                    </div>

                    <div className="card-body">
                        {token === null &&
                            Object.values(registration).map((input, index) => (
                                input.type === 'file' ?
                                    <InputField key={index} {...input} onChange={onChangeRegistration}/> :
                                    <InputField key={index} {...input} value={input.value}
                                                onChange={onChangeRegistration}/>
                            ))
                        }

                        {token !== null &&
                            Object.values(jobApply).map((input, index) => (
                                <InputField key={'jobApply' + index} {...input}
                                            onChange={
                                                (e) => setJobApply({
                                                    ...jobApply,
                                                    [e.target.name]: {
                                                        ...jobApply[e.target.name],
                                                        value: e.target.value,
                                                        errors: []
                                                    }
                                                })
                                            }/>
                            ))
                        }

                        {token !== null &&
                            Object.values(additionalFields).map((additionalField, index) => (
                                <InputField key={'additional' + index} {...additionalField}
                                            onChange={
                                                (e) => setAdditionalFields({
                                                    ...additionalFields,
                                                    [e.target.name]: {
                                                        ...additionalFields[e.target.name],
                                                        value: e.target.value
                                                    }
                                                })
                                            }/>
                            ))
                        }
                    </div>


                    <div className="card-footer">
                        <button type="submit" className="float-end btn btn-primary">{token ? 'Submit' : 'Next'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JobApply