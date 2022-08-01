import { Link, useParams } from "react-router-dom"
import JobContext from "../../../components/JobContext"
import useJobDetails from "../../../hooks/jobdetails"

function JobDetails() {
    let { job, setJob, slug } = useJobDetails()

    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    {job.job_contexts.map((element, index) => <JobContext context={element} key={index} />)}
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Job Summery</div>
                        <div className="card-body"></div>
                        <div className="card-footer">
                            <Link to={`/job-apply/${slug}`} className="btn btn-primary w-100">Apply</Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default JobDetails