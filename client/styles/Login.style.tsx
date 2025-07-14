import styled from "styled-components"

export const LoginForm = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: 100%;
    padding: 50px;
  }

`

export const InputContainer = styled.div<{ $isError: boolean }>`
  display:flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }

  input {
    height: 40px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.palette.background.primary};
    color: ${({ theme }) => theme.palette.text.primary};
    padding: 0 10px;
    border-radius: 10px;
    border: ${({ theme, $isError }) => $isError ? `2px solid ${theme.palette.error.main}` : 'none'};
  }
`

export const ForgetPassword = styled.div`
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
`

export const AccountExists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;

  a {
    margin-left: 5px;
    text-decoration: underline;
  }
`