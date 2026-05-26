import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import books from '../product_list'

const HomeScreen = () => {
    return (
        <>
            <div className="hero">
                <div>
                    <h1>Razmeni knjigu,<br />podeli priču</h1>
                    <p>Pronađi svoju sledeću omiljenu knjigu i razmeni je sa nekim u svom gradu.</p>
                </div>
            </div>

            <h2>Nove knjige</h2>
            <Row className="g-4">
                {books.map((book) => (
                    <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
                        <Product book={book} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen