import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { saveExchangeDate } from '../slices/cartSlice';

const ExchangeDateScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { exchangeItems, startDate: savedStartDate, duration: savedDuration } = cart;

    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(savedStartDate || today);
    const [duration, setDuration] = useState(savedDuration || '7');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (exchangeItems.length === 0) {
            navigate('/cart');
        }
    }, [exchangeItems, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveExchangeDate({ startDate, duration }));
        navigate('/shipping');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Datum razmene</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='startDate' className='my-2'>
                    <Form.Label>Datum pocetka razmene</Form.Label>
                    <Form.Control
                        type='date'
                        min={today}
                        value={startDate}
                        required
                        onChange={(e) => setStartDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='duration' className='my-2'>
                    <Form.Label>Trajanje razmene</Form.Label>
                    <Form.Select
                        value={duration}
                        required
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <option value='7'>7 dana</option>
                        <option value='14'>14 dana</option>
                        <option value='30'>30 dana</option>
                    </Form.Select>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                    Nastavi
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ExchangeDateScreen;
