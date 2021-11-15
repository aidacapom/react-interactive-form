import React, { useRef } from 'react'
import styled from 'styled-components'
import useForm from '../hooks/useForm'
import validateLogin from '../utils/validateLogin'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Form = styled.form`
    
`

const Input = styled.input`

`

const InputError = styled.p`

`

export default function Login() {
    const passwordRef = useRef(null)

    const { formValues, handleChange, handleSubmit, errors } = useForm ({
        id: "",
        password: ""
    }, validateLogin)

    const { id, password } = formValues

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            if(document.activeElement !== passwordRef.current) {
                passwordRef.current.focus()
            } else {
                handleSubmit(event)
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    name="id" 
                    placeholder="ID"
                    aria-label="ID"
                    value={id}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                />

                {errors.id && <InputError>{errors.id}</InputError>}

                <Input 
                    type="password"
                    name="password"
                    placeholder="Password" 
                    aria-label="Password"
                    value={password}
                    onChange={handleChange}
                    onKeyDown={handleEnterKey}
                    ref={passwordRef}
                />

                {errors.password && <InputError>{errors.password}</InputError>}
            </Form>
        </Container>
    )
}