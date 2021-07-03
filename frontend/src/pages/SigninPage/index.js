import './signin.css'
import React from 'react';
//import { Link } from 'react-router-dom';
import SigninForm from '../../containers/SigninForm';
class SigninPage extends React.Component {
    render() {
        return (
            <div>
                <SigninForm/>
            </div>
        )
    }
}

export default SigninPage;