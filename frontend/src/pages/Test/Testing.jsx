import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Testing = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Children (7-12)(Parental Support )</Card.Title>
                            <Button onClick={() => navigate("/questions/children")}>
                                Show Questions
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Teenagers (13-18)</Card.Title>
                            <Button onClick={() => navigate("/questions/teenagers")}>
                                Show Questions
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Adults (19+)</Card.Title>
                            <Button onClick={() => navigate("/questions/adults")}>
                                Show Questions
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Testing;
