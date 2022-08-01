import { useEffect } from "react"
import { Link } from "react-router-dom"

function JobCard({ job }) {



    return (
        <>
            <div className="card mb-3 w-100">
                <div className="row g-0">
                    <div className="col-md-1">
                        1
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <Link to={`/job-details/${job.slug}`}><h5 className="card-title">{job.title}</h5></Link>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobCard