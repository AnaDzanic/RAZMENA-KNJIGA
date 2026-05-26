import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { exchangeItems = [] } = useSelector((state) => state.cart);

    return (
        <Row className="justify-content-center">
            <Col md={8} lg={6}>
                <Card className="profile-card">
                    <Card.Body>
                        <h1>Profil</h1>
                        <ListGroup variant="flush" className="mb-3">
                            <ListGroup.Item>
                                <strong>Ime:</strong> {userInfo?.name || 'Korisnik'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Email:</strong> {userInfo?.email || 'Nije unet'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Knjige u korpi:</strong> {exchangeItems.length}
                            </ListGroup.Item>
                        </ListGroup>
                        <Button as={Link} to="/cart">
                            Otvori korpu
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
