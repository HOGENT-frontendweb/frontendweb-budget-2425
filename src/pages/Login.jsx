import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { search } = useLocation();
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    },
  });
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        // Redirect to the page the user was on before logging in, if present in the URL
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <FormProvider {...methods}>
      <Container className="py-4" style={{ maxWidth: 500 }}>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <h1 className="mb-4">Sign in</h1>
          <Error error={error} />

          <LabelInput
            label='Email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
            data-cy='email_input'
          />

          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
            data-cy='password_input'
          />

          <Row className="justify-content-end">
            <Col xs="auto">
              <ButtonGroup>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  data-cy="submit_btn"
                >
                  Sign in
                </Button>
                <Button
                  variant="light"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </FormProvider>
  );
}
