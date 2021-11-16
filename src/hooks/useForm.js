import { useState } from 'react'

const useForm = (initialState = {}, validate, submit) => {
    const [formValues, setFormValues] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormValues({
            ...formValues, 
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(validate(formValues))
    }

    return {formValues, handleChange, handleSubmit, errors}
}

export default useForm