import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ book }) => {
    return (
        <Card className='my-3 p-3 rounded product-card'>
            <Link to={`/product/${book.id}`}>
                <Card.Img src={book.image} variant='top'
                    style={{ height: '250px', objectFit: 'cover' }} />
            </Link>

            <Card.Body>
                <Link to={`/product/${book.id}`}>
                    <Card.Title as='div' className='product-title'>
                        <strong>{book.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div' className='text-muted'>{book.author}</Card.Text>

                <Card.Text as='div'>
                    <Rating value={book.rating} text={`${book.numReviews} recenzija`} />
                </Card.Text>

                <Card.Text as='h3' className='text-success'>{book.city}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product