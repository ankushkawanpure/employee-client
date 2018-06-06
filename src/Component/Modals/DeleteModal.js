/**
 * Created by ankush on 6/3/18.
 */
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

class DeleteModal extends Component {

    constructor(props) {
        super(props);

        this.state ={
            modalOpen: false
        }
    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    handleSubmit = (e) => {

        console.log(e);
        let id = e;

        axios({
            method: 'delete',
            responseType: 'json',
            url: `${this.props.server}/api/employees/${id}`,
        })
            .then((response) => {
                this.handleClose();
                this.props.onEmployeeDeleted(response.data.result);
                this.props.socket.emit('delete', response.data.result);
            })
            .catch((err) => {
                this.handleClose();
                throw err;
            });
    };

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen} color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                dimmer='inverted'
                size='tiny'
            >
                <Modal.Header>{this.props.headerTitle}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete <strong>{this.props.employee.name}</strong>?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.handleSubmit(this.props.employee._id)} color='red'>Confirm</Button>
                    <Button onClick={this.handleClose} color='black'>Cancle</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteModal;
