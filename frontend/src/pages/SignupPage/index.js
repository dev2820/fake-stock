import './signupPage.css'
import React from 'react';
import SignupForm from '../../containers/SignupForm';
import Wave from '../../components/Wave';
class SignupPage extends React.Component {
    render() {
        return (
            <div>
                <Wave></Wave>
                <div className="center">
                    <SignupForm/>
                </div>
            </div>
        )
    }
}

export default SignupPage;