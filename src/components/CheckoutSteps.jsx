import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Prijava</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Prijava</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/">
                        <Nav.Link>Odabir knjige</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Odabir knjige</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/exchange-date">
                        <Nav.Link>Datum razmene</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Datum razmene</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/send-request">
                        <Nav.Link>Slanje zahteva</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Slanje zahteva</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
