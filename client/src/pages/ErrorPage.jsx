import '../Styles/Error404.css'; // Import CSS file for Error404 styling
import { NavLink } from 'react-router-dom';

export const Error404 = () => {
    return (
        <div className="error404">
            <h1 className="error-heading">404</h1>
            <p className="error-message">Oops! &#x2639; Page not found</p>
            <NavLink to="/" id="backtohome">&#10149; Back to Home Page</NavLink>
        </div>
    );
}

