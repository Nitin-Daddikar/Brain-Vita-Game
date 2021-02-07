import React from 'react';
import { connect } from 'react-redux';
import formStyle from './Form.module.css';
import { submitForm } from '../../actions/formActions';

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: ''
        }
        this.onFormUpdate = this.onFormUpdate.bind(this);
    }
    
    /**
     * @description update the state value which is used in form
     * @param {Event} event: on change event when input is changed
     */
    onFormUpdate(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /**
     * @description to submit the form
     * will check if name is valid (only letters)
     */
    onClickSubmit() {
        const RegExpression = /^[^-\s][a-zA-Z\s]*$/;
        if (RegExpression.test(String(this.state.userName))) {
            this.props.submitForm(this.state.userName, this.props.noOfMarblesLeft)
        } else {
            alert('ERROR : Please enter user name to submit the score.')
        }
    }

    render() { 
        return  <div id={formStyle.formContainer}>
            <input type="text" placeholder="User Name" value={this.state.userName} name="userName" onChange={this.onFormUpdate}/>
            <button id={formStyle.submitButton} onClick={this.onClickSubmit.bind(this)}>Submit</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return state.formReducer;
}

const mapDispatchToProps = (dispatch)=> {
  return {
    submitForm: (userName, score) => {
        dispatch(submitForm({userName, score}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Form));
