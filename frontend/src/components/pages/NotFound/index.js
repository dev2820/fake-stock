import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const NotFound = () => {
    const goBack = () => {
        this.props.history.goBack();
    }
    const location = useLocation();
    return (
        <div>
            <h2>404</h2>
            <h3>Oops... page not found</h3> 
            <p>we can't find page {location.pathname}. please check your url</p>
            <Link to='/'>Go Home</Link>
            <button onClick={this.goBack}>Go Back</button>
        
        </div>
    )
}

export default NotFound;