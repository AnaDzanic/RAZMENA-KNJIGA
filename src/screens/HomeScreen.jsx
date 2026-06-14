import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const { data: books, isLoading, error } = useGetProductsQuery();

    return (
        <>
            <div className="hero">
                <div>
                    <h1>Razmeni knjigu,<br />podeli priču</h1>
                    <p>Pronađi svoju sledeću omiljenu knjigu i razmeni je sa nekim u svom gradu.</p>
                </div>
            </div>

            <h2>Nove knjige</h2>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row className="g-4">
                    {books.map((book) => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <Product book={book} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen