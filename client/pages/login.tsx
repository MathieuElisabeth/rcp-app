import { CircularProgress } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { login } from '../src/actions/auth'
import { useAppDispatch } from '../store'
import { ActionButton, AuthContainer, AuthPage, Divider, ErrorMessage, Tagline } from '../styles/GlobalStyles'
import { AccountExists, ForgetPassword, InputContainer, LoginForm } from '../styles/Login.style'

const Login: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useSelector((state: { auth: { isLoggedIn: boolean } }) => state.auth);
  const alert = useSelector((state: { message: { login: { message: string, field: string } } }) => state.message);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      router.push("/")
    }
  }, [])

  const onChangeEmail = (evt: { target: { value: any } }) => {
    const email = evt.target.value;
    setEmail(email);
  }

  const onChangePassword = (evt: { target: { value: any } }) => {
    const password = evt.target.value;
    setPassword(password);
  }

  const handleLogin = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    setLoading(true);
    dispatch(login(email, password))
      .then((res) => {
        router.push("/");
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);
  };

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
        <LoginForm>
          <form onSubmit={handleLogin}>
            <InputContainer $isError={!!alert?.login?.message && alert?.login?.field === 'email'}>
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
              {(alert?.login?.message && alert?.login?.field === 'email') && (
                <ErrorMessage>
                  {alert?.login?.message}
                </ErrorMessage>
              )}
            </InputContainer>
            <InputContainer $isError={!!alert?.login?.message && alert?.login?.field === 'password'}>
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
              {(alert?.login?.message && alert?.login?.field === 'password') && (
                <ErrorMessage>
                  {alert?.login?.message}
                </ErrorMessage>
              )}
            </InputContainer>
            {(alert?.login?.message && alert?.login?.field === "") && (
              <ErrorMessage>
                {alert?.login?.message}
              </ErrorMessage>
            )}
            <ForgetPassword>Mot de passe oublié ?</ForgetPassword>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <ActionButton type='submit' disabled={loading}>
                Se connecter
              </ActionButton>
            )}
          </form>
          <AccountExists>
            <p>
              Vous n’avez pas de compte  ?
              <Link href="/register">
                Inscrivez-vous
              </Link>
            </p>
          </AccountExists>
        </LoginForm>
      </AuthContainer>
    </AuthPage>
  )
}

export default Login
