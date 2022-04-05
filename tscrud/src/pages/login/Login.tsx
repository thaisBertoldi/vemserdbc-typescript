import {Formik, Field, Form, FormikHelpers} from 'formik'
import { useContext, useEffect } from 'react'
import { LoginDTO } from '../../model/LoginDTO'
import { LoginTitle, ContainerLogin, LoginForm } from './Login.styles'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { handleLogin } = useContext<any>(AuthContext);
  const getToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(getToken){
    navigate('/')
    alert('Você já está logado. Faça logout para acessar com outra conta.')
  }
  }, [])

  return (
    <ContainerLogin>
      <LoginTitle>Login</LoginTitle>
      <Formik
        initialValues= {{
          usuario: '',
          senha: ''
        }}
        onSubmit={(
          values: LoginDTO,
          {setSubmitting}: FormikHelpers<LoginDTO>
        ) => {
          handleLogin(values);
          setSubmitting(false);
        }}
        >
          <Form>

            <LoginForm>
              <label htmlFor='usuario'> Usuário</label>
              <Field name='usuario' id='usuario' placeholder='Digite o nome do usuário' />
            </LoginForm>

            <LoginForm>
              <label htmlFor='senha'> Senha</label>
              <Field name='senha' id='senha' placeholder='Digite sua senha' />
            </LoginForm>

            <button type='submit'>Entrar</button>

          </Form>
      </Formik>
    </ContainerLogin>
  )
}

export default Login