import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import _ from 'lodash'
import { register } from '../src/actions/auth'
import { useAppDispatch } from '../store'
import { ActionButton, AuthContainer, AuthPage, Divider, ErrorMessage, Tagline } from '../styles/GlobalStyles'
import { AccountExists, FormHeader, InputContainer, RegisterForm } from '../styles/Register.style'

const Register: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth)
  const alert = useSelector((state: { message: { register: { message: string, field: string } } }) => state.message)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState(false)
  const [successful, setSuccessful] = useState(false)

  useEffect(() => {
    if (auth?.isLoggedIn) {
      router.push("/")
    }
  }, [])

  const onChangeUsername = (evt: { target: { value: string } }) => {
    const username = evt.target.value
    setUsername(username)
  }

  const onChangeEmail = (evt: { target: { value: string } }) => {
    const email = evt.target.value
    setEmail(email)
  }

  const onChangePassword = (evt: { target: { value: string } }) => {
    const password = evt.target.value
    setPassword(password)
  }

  const handleRegister = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      setErrorPassword(true)
      return
    }
    setErrorPassword(false)
    setSuccessful(false)
    dispatch(register(username, email, password))
      .then((res) => {
        setSuccessful(true)
        // setTimeout(() => router.push('/login'), 2000)
        router.push('/login')
      })
      .catch((err) => {
        setSuccessful(false)
      })

  }

  return (
    <AuthPage>
      <AuthContainer>
        <Tagline>
          <p>
            Créez, partagez et réalisez
            <br />
            <span>Vos Recettes</span>
            <br />
            dès maintenant
          </p>
        </Tagline>
        <Divider></Divider>
        <RegisterForm>
          <form onSubmit={handleRegister}>
            {/* <FormHeader>
              <InputContainer>
                <label htmlFor="first_name">Prénom</label>
                <input
                  aria-label="Entrer votre nom"
                  type="text"
                  placeholder="Prénom (e.x: Pierre)"
                  className="InputForm"
                  name="first_name"
                />
              </InputContainer>
              <InputContainer>
                <label htmlFor="last_name">Nom</label>
                <input
                  aria-label="Entrer votre adresse email"
                  type="text"
                  placeholder="Nom (e.x: Vinsmoke)"
                  className="InputForm"
                  name="last_name"
                />
              </InputContainer>
            </FormHeader> */}
            <InputContainer $isError={!!alert?.register?.message && alert?.register?.field === 'username'}>
              <label htmlFor="pseudo">Pseudo</label>
              <input
                aria-label="Entrer votre adresse email"
                type="text"
                placeholder="pseudo"
                className="InputForm"
                name="pseudo"
                value={username}
                onChange={onChangeUsername}
              />
              {(alert?.register?.message && alert?.register?.field === 'username') && (
                <ErrorMessage>
                  {alert?.register?.message}
                </ErrorMessage>
              )}
            </InputContainer>
            <InputContainer $isError={!!alert?.register?.message && alert?.register?.field === 'email'}>
              <label htmlFor="email">E-mail</label>
              <input
                aria-label="Entrer votre adresse email"
                type="text"
                placeholder="E-mail"
                className="InputForm"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              {(alert?.register?.message && alert?.register?.field === 'email') && (
                <ErrorMessage>
                  {alert?.register?.message}
                </ErrorMessage>
              )}
            </InputContainer>
            <InputContainer $isError={!!alert?.register?.message && alert?.register?.field === 'password'}>
              <label htmlFor="password">Mot de passe</label>
              <input
                aria-label="Entrer votre mot de passe"
                type="password"
                placeholder="Mot de passe"
                className="InputForm"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              {(alert?.register?.message && alert?.register?.field === 'password') && (
                <ErrorMessage>
                  {alert?.register?.message}
                </ErrorMessage>
              )}
            </InputContainer>
            <InputContainer $isError={errorPassword}>
              <label htmlFor="passwordCheck">Confirmation mot de passe</label>
              <input
                aria-label="Confirmer votre mot de passe"
                type="password"
                placeholder="Mot de passe"
                className="InputForm"
                name="passwordCheck"
                value={confirmPassword}
                onChange={evt => setConfirmPassword(evt.target.value)}
              />
              {errorPassword && (
                <ErrorMessage>
                  Mot de passe incorrect
                </ErrorMessage>
              )}
            </InputContainer>

            {(alert?.register?.message && alert?.register?.field === "") && (
              <ErrorMessage>
                {alert?.register?.message}
              </ErrorMessage>
            )}

            <ActionButton
              type="submit"
              className="Btn-primary"
            >
              S&apos;incrire
            </ActionButton>
          </form>
          <AccountExists>
            <p>
              Vous avez déjà un compte  ?
              <Link href="/login">
                Connectez-vous
              </Link>
            </p>
          </AccountExists>
        </RegisterForm>
      </AuthContainer>
    </AuthPage>
  )
}

export default Register
