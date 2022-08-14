import useJobDetails from "../../../hooks/jobdetails"
import axios from "/src/services/apiService"
import InputField from "../../../components/fields/InputField";
import {useState} from "react";

function JobApply() {
    let {job, setJob} = useJobDetails()

    const handleSubmit = (event) => {
        event.preventDefault()
        cleanErrors()


    }

    const register = () => {
        let formData = new FormData()
        for (let key in values) {
            formData.append(key, values[key])
        }
        formData.append('cv', cv)
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

    const cleanErrors = () => {
        let newInputs = []
        for (let input of inputs) {
            input.errors = []
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
        email: '', full_name: '', phone: '', password: '', additional_message: '', expected_salary: ''
    })

    const [cv, setCV] = useState('')

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
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
                            <InputField key={index} {...input} value={values[input.name]} onChange={onChange}/>
                        ))
                    }

                    <div className="mb-3">
                        <label htmlFor="">CV</label>
                        <input type="file" name="cv" onChange={(e) => setCV(e.target.files[0])}
                               className="form-control"/>
                    </div>

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