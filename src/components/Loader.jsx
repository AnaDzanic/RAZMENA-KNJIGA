import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner 
            animation="border"
            role="staus"
            style={{
                width: "50px",
                height: "50px",
                margin: "auto",
                display: "block",
            }}
        ></Spinner>

    )
}

export default Loader;