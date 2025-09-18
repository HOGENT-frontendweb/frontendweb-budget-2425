import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  if (!ready) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the application.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={`/login?redirect=${pathname}`} />;
}
