import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Lista za razmenu</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Lista je prazna <Link to="/">Vrati se nazad</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/book/${item._id}`}>{item.name}</Link>
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
                            Broj knjiga: {cartItems.length}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Mesečna članarina: {cart.membershipPrice} RSD
                        </ListGroup.Item>
                        {cart.daysLate > 0 && (
                            <ListGroup.Item>
                                Kazna za kašnjenje: {cart.lateFee} RSD
                            </ListGroup.Item>
                        )}
                        {cart.isBookDamaged && (
                            <ListGroup.Item>
                                Kazna za oštećenje: {cart.damageFee} RSD
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <strong>Ukupno: {cart.totalPrice} RSD</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Nastavi sa razmenou
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;