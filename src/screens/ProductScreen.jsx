import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Image, Card, Button, Badge } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import books from '../product_list'
import { addToExchangeList } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = books.find((book) => String(book.id) === String(productId));

    const addToCartHandler = () => {
        dispatch(addToExchangeList({ ...product, _id: product.id }));
        navigate('/cart');
    }

    return (
        <>
            <Link className='btn btn-outline-secondary mb-4' to='/'>
                Nazad
            </Link>
            {!product ? (
                <Message variant="danger">
                    Knjiga nije pronadjena
                </Message>
            ) : (
                <>
                    <Card className='border-0 shadow-sm p-4 mb-4'>
                        <Row className='align-items-center'>
                            <Col md={8}>
                                <h2 className='mb-2'>{product.name}</h2>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} recenzija`}
                                />
                            </Col>
                        </Row>
                    </Card>

                    <Row className='gy-4'>
                        <Col lg={8}>
                            <Card className='border-0 shadow-sm p-4'>
                                <div className='text-center'>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fluid
                                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                                    />
                                </div>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className='border-0 shadow-sm'>
                                <Card.Body>
                                    <h4 className='mb-4'>Informacije o knjizi</h4>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <span>Autor:</span>
                                        <span>{product.author}</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <span>Zanr:</span>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <span>Status:</span>
                                        {product.status === 'Dostupna' ? (
                                            <Badge bg='success'>Dostupna</Badge>
                                        ) : (
                                            <Badge bg='danger'>Nije dostupna</Badge>
                                        )}
                                    </div>
                                    <div className='d-grid'>
                                        <Button
                                            className='add-to-cart-btn'
                                            type='button'
                                            disabled={product.status !== 'Dostupna'}
                                            onClick={addToCartHandler}
                                        >
                                            Dodaj u listu za razmenu
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className='border-0 shadow-sm mt-4'>
                        <Card.Body>
                            <h4 className='mb-3'>Opis knjige</h4>
                            <p className='text-muted mb-0'>{product.description}</p>
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    )
}

export default ProductScreen
