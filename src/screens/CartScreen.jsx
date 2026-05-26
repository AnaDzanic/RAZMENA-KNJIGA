import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromExchangeList } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { exchangeItems = [] } = cart;

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromExchangeList(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Lista za razmenu</h1>
                {exchangeItems.length === 0 ? (
                    <Message>
                        Lista je prazna <Link to="/">Vrati se nazad</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {exchangeItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        {item.author}
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Pregled zahteva</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Broj knjiga: {exchangeItems.length}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Mesecna clanarina: {cart.membershipPrice} RSD
                        </ListGroup.Item>
                        {cart.daysLate > 0 && (
                            <ListGroup.Item>
                                Kazna za kasnjenje: {cart.lateFee} RSD
                            </ListGroup.Item>
                        )}
                        {cart.isBookDamaged && (
                            <ListGroup.Item>
                                Kazna za ostecenje: {cart.damageFee} RSD
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <strong>Ukupno: {cart.totalPrice} RSD</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={exchangeItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Nastavi sa razmenom
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
