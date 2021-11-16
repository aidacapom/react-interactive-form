import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useForm from '../hooks/useForm'
import validateLogin from '../utils/validateLogin'

import avatarDefault from '../img/penguin-default.png'
import avatarLookingDown from '../img/penguin-looking-down.png'
import avatarClosingEyes1 from '../img/penguin-eyes-closed-1.png'
import avatarClosingEyes2 from '../img/penguin-eyes-closed-2.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1em;
`

const Avatar = styled.div`
    width: 30%;
    position: relative;

    &:after {
        position: absolute;
        content: '';
        background: #2b2b2b;
        width: 90%;
        height: 100%;
        top: 60%;
        left: 50%;
        transform: translate(-50%);
        border-radius: 50%;
        z-index: -1;
    }

    @media only screen and (min-width: 720px) {
        width: 15%;
    }

    @media only screen and (min-width: 1200px) {
        width: 10%;
    }
 `

const AvatarHead = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 2.2em;
    transition: all .2s ease;
    transform: rotate(${props => props.rotation}deg)
`

const FormContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;  
    max-width: 540px;
    background-color: #fff;
    border-radius: .5em;
    border: 3px solid #000;
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
    background-color: #f7f7f7;

    &:focus {
        border: 2px solid #faed75;
        background: #fff;
    }
`

const InputError = styled.p`
    color: #9e1a1a;
`

export default function Login() {
    const avatarClosingEyes = [
        avatarClosingEyes1,
        avatarClosingEyes2
    ]

    const [avatarSrc, setAvatarSrc] = useState(avatarDefault)
    const [avatarRotation, setAvatarRotation] = useState(0)

    const passwordRef = useRef(null)

    const { formValues, handleChange, handleSubmit, errors } = useForm ({
        id: "",
        password: ""
    }, validateLogin)

    const { id, password } = formValues

    const closeAvatarEyes = () => {
        setTimeout(() => {
            let cont = 0;
            const closeEyes = setInterval(() => {
                setAvatarSrc(avatarClosingEyes[cont])

                if(cont < avatarClosingEyes.length - 1) {
                    cont++
                } else {
                    clearInterval(closeEyes)
                }
            }, 50)
        }, 300) 
    }

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            if(document.activeElement !== passwordRef.current) {
                passwordRef.current.focus()
            } else {
                handleSubmit(event)
                passwordRef.current.blur()
            }

            return true
        }
        return false
    }

    const handleAvatarReading = (event) => {
        if(!handleEnterKey(event)) {
            const length = event.target.value.length
            if(length >= 0 && length <= 5) {
                setAvatarRotation(12)
            } else if(length >= 6 && length <= 16) {
                setAvatarRotation(6)
            } else if(length >= 17 && length <= 27) {
                setAvatarRotation(0)
            } else if(length >= 28 && length <= 38) {
                    setAvatarRotation(-6)
            } else {
                setAvatarRotation(-12)
            }
        }
    }

    const handleGetFocus = (event) => { 
        setAvatarRotation(0)

        const name = event.target.name
        if(name === 'id') {
            setAvatarSrc(avatarLookingDown)
        } else if(name === 'password') {
            closeAvatarEyes()
        }
    }

    const handleLoseFocus = () => {
        setAvatarSrc(avatarDefault)
    }

    return (
        <Container>
            <Avatar>
                <AvatarHead src={avatarSrc} rotation={avatarRotation} />
            </Avatar>
            
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        name="id" 
                        placeholder="ID"
                        aria-label="ID"
                        value={id}
                        onChange={handleChange}
                        onFocus={handleGetFocus}
                        onBlur={handleLoseFocus}
                        onKeyDown={handleAvatarReading}
                    />

                    {errors.id && <InputError>{errors.id}</InputError>}

                    <Input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        aria-label="Password"
                        value={password}
                        onChange={handleChange}
                        onFocus={handleGetFocus}
                        onBlur={handleLoseFocus}
                        onKeyDown={handleEnterKey}
                        ref={passwordRef}
                    />

                    {errors.password && <InputError>{errors.password}</InputError>}
                </Form>
            </FormContainer>
        </Container>
    )
}