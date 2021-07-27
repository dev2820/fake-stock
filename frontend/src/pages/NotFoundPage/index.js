import React from 'react'
import { useLocation,Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
const NotFoundPage = (props) => {
    const goBack = () => {
        props.history.goBack();
    }
    const location = useLocation();
    const { isAccessToken } = useSelector(({ userReducer }) => ({
        isAccessToken: !!userReducer.accessToken,
    }));
    return (
        <React.Fragment>
            <h2>404</h2>
            <h3>Oops... page not found</h3> 
            <p>we can't find page "{location.pathname}". please check your url</p>
            <button>
                <Link to='/'>Go Home</Link>
            </button>
            <button onClick={goBack}>Go Back</button>
            {isAccessToken && <Redirect to="/" />}
        </React.Fragment>
    )
}  

export default NotFoundPage;