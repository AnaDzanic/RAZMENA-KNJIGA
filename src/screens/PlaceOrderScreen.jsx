import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearExchangeList } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.exchangeItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                membershipPrice: cart.membershipPrice,
                lateFee: cart.lateFee,
                damageFee: cart.damageFee,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearExchangeList());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Podaci za dostavu</h2>
                            <p>
                                <strong>Adresa: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Način plaćanja</h2>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Knjige za razmenu</h2>
                            {cart.exchangeItems.length === 0 ? (
                                <Message>Lista je prazna</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.exchangeItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.author}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Rezime zahteva</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Mesečna članarina</Col>
                                    <Col>{cart.membershipPrice} RSD</Col>
                                </Row>
                            </ListGroup.Item>
                            {cart.daysLate > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Kazna za kašnjenje</Col>
                                        <Col>{cart.lateFee} RSD</Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            {cart.isBookDamaged && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Kazna za oštećenje</Col>
                                        <Col>{cart.damageFee} RSD</Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Ukupno</strong></Col>
                                    <Col><strong>{cart.totalPrice} RSD</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.exchangeItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Pošaljite zahtev
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
