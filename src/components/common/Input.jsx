import React from 'react'

const Input = ({ name, type, value, onChange, label, placeholder, required=false }) => {
    return (
        <div className="form-control">
            <label className="text-xl" htmlFor={name}>{label}</label>
            <input
                className=''
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default Input;
