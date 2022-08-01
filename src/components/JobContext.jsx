function JobContext({ context }) {

    function createMarkup(content) {
        return { __html: content }
    }

    return (
        <div>
            <h1 className="display-6">{context.title}</h1>
            <div dangerouslySetInnerHTML={createMarkup(context.description)}></div>
        </div>
    )
}

export default JobContext