import { useParams } from "react-router-dom"
import useJobDetails from "../../../hooks/jobdetails"

function JobApply() {
    let { job, setJob } = useJobDetails()

    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Apply For the Position of {job.title}
                    </div>
                    <div className="card-body">
                        Form
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobApply