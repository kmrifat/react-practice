import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from "/src/services/apiService";

const useJobDetails = () => {
    let {slug} = useParams()

    let [job, setJob] = useState({
        job_contexts: [],
        additional_fields: []
    })

    let fetchJobDetails = () => {
        axios.get(`job/${slug}/`).then(response => {
            setJob(response.data)
        })
    }

    useEffect(() => {
        fetchJobDetails()
    }, [])

    return {job, setJob, slug}

}

export default useJobDetails