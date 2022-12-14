import JobCard from "../../../components/JobCard"
import axios from "/src/services/apiService"
import {useEffect} from "react"
import {useState} from "react"

function Home() {

    let [jobs, setJob] = useState([])

    let fetchData = () => {
        axios.get('jobs/').then(response => {
            setJob(response.data)
            console.log(response);
        })
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="mt-4">
            {jobs.map((element, index) => <JobCard job={element} key={index}/>)}
        </div>
    )
}

export default Home