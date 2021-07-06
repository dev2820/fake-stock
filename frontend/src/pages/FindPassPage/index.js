import React from 'react';
import FindPassForm from '../../containers/FindPassForm'
import Wave from '../../components/Wave'
class FindPassPage extends React.Component {
    render() {
        return (
            <div>
                <Wave></Wave>
                <div className="center">
                    <FindPassForm/>
                </div>
            </div>
        )
    }
}

export default FindPassPage;