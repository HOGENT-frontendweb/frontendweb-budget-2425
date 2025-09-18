import {
  useCallback, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider, useForm,
} from 'react-hook-form';

import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Register() {

  const {
    error, loading, register,
  } = useAuth();

  const navigate = useNavigate();

  const methods = useForm();
  const {
    getValues, handleSubmit, reset,
  } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({
      name, email, password,
    }) => {
      const loggedIn = await register({
        name, email, password,
      });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = useMemo(() => ({
    name: { required: 'Name is required' },
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <Container className="py-4" style={{ maxWidth: 500 }}>
        <Form onSubmit={handleSubmit(handleRegister)}>
          <h1 className="mb-4">Register</h1>
          <Error error={error} />
          <LabelInput
            label='Name'
            type='text'
            name='name'
            placeholder='Your Name'
            validationRules={validationRules.name}
          />
          <LabelInput
            label='Email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />

          <LabelInput
            label='Confirm password'
            type='password'
            name='confirmPassword'
            validationRules={validationRules.confirmPassword}
          />

          <Row className="justify-content-end">
            <Col xs="auto">
              <ButtonGroup>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                >
                  Register
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