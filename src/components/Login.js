import React, { useRef } from 'react'
import styled from 'styled-components'
import useForm from '../hooks/useForm'
import validateLogin from '../utils/validateLogin'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1em;
`

const Avatar = styled.img`
    border-radius: 50%;
    padding: 2.25em 1.5em;
    background: #ffffcc;
`

const FormContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;  
    max-width: 540px;
    background-color: #fff;
    border-radius: .5em;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
    padding: 1.25em 5% 2.5em;
`

const Form = styled.form`
    width: 100%;
    margin-top: -1.25em;
`

const Input = styled.input`
    display: block;
    width: 100%;
    margin: 2.5em auto 1em;
    border-radius: .25em;
    padding: .5em;
    outline: none;
    border: none;
    font-size: 1rem;
    background-color: #eee;

    &:focus {
        border: 2px solid teal;
    }
`

const InputError = styled.p`
    color: #9e1a1a;
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
            <FormContainer>
                <Avatar src="img/penguin-default.png"/>
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
            </FormContainer>
        </Container>
    )
}