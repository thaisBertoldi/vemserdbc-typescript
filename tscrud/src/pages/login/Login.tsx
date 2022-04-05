import {Formik, Field, Form, FormikHelpers} from 'formik'
import { useContext } from 'react'
import { LoginDTO } from '../../model/LoginDTO'
import { LoginTitle, ContainerLogin, LoginForm } from './Login.styles'
import { AuthContext } from '../../context/AuthContext'

function Login() {
  const { handleLogin } = useContext<any>(AuthContext);

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