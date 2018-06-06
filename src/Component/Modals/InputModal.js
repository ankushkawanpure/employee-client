/**
 * Created by ankush on 6/3/18.
 */
import React, { Component } from 'react';
import { Message, Button, Form } from 'semantic-ui-react';
import axios from 'axios';


class InputModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            basesalary: '',
            deduction: '',
            takehomepay: '',
            formClassName: '',
            formSuccessMessage: 'true',
            formErrorMessage: ''
        };
    }

    componentWillMount() {
        // Fill in the form with the appropriate data if user id is provided
        if (this.props.employeeID) {
            axios.get(`${this.props.server}/api/employees/${this.props.employeeID}`)
                .then((response) => {
                    this.setState({
                        name: response.data.name,
                        email: response.data.email,
                        address: response.data.address,
                        basesalary: response.data.basesalary,
                        deductions: response.data.deductions,
                        takehomepay: response.data.takehomepay,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    };

    // handleSelectChange = (e, data) => {
    //     this.setState({ gender: data.value });
    // };

    handleSubmit = (e) => {
        // Prevent browser refresh
        e.preventDefault();

        const employee = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            basesalary: this.state.basesalary,
            deductions: this.state.deductions,
            takehomepay: this.state.takehomepay
        };

        // Acknowledge that if the user id is provided, we're updating via PUT
        // Otherwise, we're creating a new data via POST
        const method = this.props.employeeID ? 'put' : 'post';
        const params = this.props.employeeID ? this.props.employeeID : '';

        axios({
            method: method,
            responseType: 'json',
            url: `${this.props.server}/api/employees/${params}`,
            data: employee
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    formClassName: 'success',
                    formSuccessMessage: false
                });

                if (!this.props.employeeID) {
                    this.setState({
                        name: '',
                        email: '',
                        address: '',
                        basesalary: '',
                        deductions: '',
                        takehomepay: ''
                    });
                    console.log("in here")
                    this.props.onEmployeeAdded(response.data.result);
                    this.props.socket.emit('add', response.data.result);
                } else {
                    this.props.onEmployeeUpdated(response.data.result);
                    this.props.socket.emit('update', response.data.result);
                }

            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.data) {
                        this.setState({
                            formClassName: 'warning',
                            formErrorMessage: err.response.data.msg
                        });
                    }
                }
                else {
                    this.setState({
                        formClassName: 'warning',
                        formErrorMessage: 'Something went wrong. ' + err
                    });
                }
            });
    }

    render() {
        const formClassName = this.state.formClassName;
        const formSuccessMessage = this.state.formSuccessMessage;
        const formErrorMessage = this.state.formErrorMessage;
        return (
            <Form className={formClassName} onSubmit={this.handleSubmit}>
                <Form.Input
                    label='Name'
                    type='text'
                    placeholder='First Name  Last name'
                    name='name'
                    maxLength='40'
                    required
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Email'
                    type='email'
                    placeholder='email@example.com'
                    name='email'
                    maxLength='40'
                    required
                    value={this.state.email}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Address'
                    type='text'
                    placeholder='city'
                    name='address'
                    maxLength='40'
                    required
                    value={this.state.address}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Deductions'
                    type='text'
                    placeholder='Deductions'
                    name='deductions'
                    maxLength='40'
                    required
                    value={this.state.deductions}
                    onChange={this.handleInputChange}
                />
                <Form.Group widths='equal'>
                    <Form.Input
                        label='Base Salary'
                        type='number'
                        placeholder='XXXXXX'
                        min={50000}
                        max={1000000}
                        name='basesalary'
                        required
                        value={this.state.basesalary}
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        label='Take Home Salary'
                        type='number'
                        placeholder='XXXXXX'
                        min={50000}
                        max={1000000}
                        name='takehomepay'
                        required
                        value={this.state.takehomepay}
                        onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Message
                    success={this.state.formSuccessMessage}
                    color='green'
                    header='Employee added!'
                    content={formSuccessMessage}
                />
                <Message
                    warning
                    color='yellow'
                    header='Woah!'
                    content={formErrorMessage}
                />
                <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
                <br/><br/>
            </Form>
        );
    }
}

export default InputModal;
