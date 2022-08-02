import {useParams} from "react-router-dom"
import useJobDetails from "../../../hooks/jobdetails"
import axios from "/src/services/apiService"

function JobApply() {
    let {job, setJob} = useJobDetails()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('register-candidate/', {}).then(response => {
            console.log('Hello world')
        }).catch(error => {
            console.log(error.response.data)
        })
    }

    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-6">
                <form onSubmit={handleSubmit} className="card">
                    <div className="card-header">
                        Apply For the Position of {job.title}
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control is-valid"/>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="email" className="form-control"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="email" className="form-control"/>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JobApply