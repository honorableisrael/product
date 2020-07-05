import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IAppProps {
}

const Home: React.FunctionComponent<IAppProps> = (props:any) => {
  return (
      <>
        <Container fluid={true}>
            <Row>
                <Col md={5}>
                    
                </Col>
            </Row>
        </Container>
      </>
  );
};

export default Home;
