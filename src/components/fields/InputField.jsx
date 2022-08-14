function InputField(props) {
    const {label, onChange, id, ...inputProps} = props
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input className={props?.errors?.length >= 1 ? 'form-control is-invalid' : 'form-control '} {...inputProps}
                   onChange={onChange}/>
            <div className="invalid-feedback">{props?.errors}</div>
        </div>
    )
}

export default InputField