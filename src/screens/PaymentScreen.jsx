import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, ListGroup, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Način plaćanja</h1>

            <Card className='my-3'>
                <ListGroup variant='flush'>
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
                </ListGroup>
            </Card>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Odaberite način plaćanja</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='PayPal'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='Kreditna/Debitna kartica'
                            id='Card'
                            name='paymentMethod'
                            value='Card'
                            checked={paymentMethod === 'Card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>
                    Nastavite
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;