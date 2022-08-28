const resetErrors = (state, setState, errors = []) => {
    let newState = {}
    for (let input in state) {
        let element = state[input]

        if (errors[input] !== undefined) {
            element.errors = errors[input]
        } else {
            element.errors = []
        }
        newState[input] = element
    }
    setState(newState)
}

export default resetErrors