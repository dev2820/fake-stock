import './signinPage.css'
import React from 'react';
//import { Link } from 'react-router-dom';
import SigninForm from '../../containers/SigninForm';
import Wave from '../../components/Wave';
class SigninPage extends React.Component {
    render() {
        return (
            <div>
                <Wave></Wave>
                <div className="center">
                    <SigninForm/>
                </div>
                
            </div>
        )
    }
}

export default SigninPage;