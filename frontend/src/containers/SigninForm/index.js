import './signinForm.css'
import React from 'react';
import { connect } from 'react-redux';
import { fetchTestActionCreator } from '../../modules/signinReducer'
class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputText : ""
        };
        this.handleExchangeTest = this.handleExchangeTest.bind(this);
    }
    render() {
        return (
            <div>
                signin form
                <h2>{this.props.test}</h2>
                <input type="text" onChange={(e)=>{this.setState({inputText:e.target.value})}}></input>
                <button onClick={this.handleExchangeTest}>변경</button>
            </div>
        )
    }
    handleExchangeTest(event) {
        this.props.fetchTestActionCreator({text:this.state.inputText});
    }
}

/*redux 연결 */
export default connect(({signinReducer}) => ({
    test: signinReducer.test
}), {
    fetchTestActionCreator
})(SigninForm);

// export default connect((state) => ({
//     test: state.signinReducer
// }), {
//     fetchTestActionCreator
// })(SigninForm);
