/**
 * Created by ankush on 6/3/18.
 */
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import InputModal from './InputModal';

class ContainerModal extends Component {

    render() {
        return (
            <Modal
                trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
                dimmer='inverted'
                size='tiny'
                closeIcon='close'
            >
                <Modal.Header>{this.props.headerTitle}</Modal.Header>

                <Modal.Content>
                    <InputModal
                        buttonSubmitTitle={this.props.buttonSubmitTitle}
                        buttonColor={this.props.buttonColor}
                        employeeID={this.props.employeeID}
                        onEmployeeAdded={this.props.onEmployeeAdded}
                        onEmployeeUpdated={this.props.onEmployeeUpdated}
                        server={this.props.server}
                        socket={this.props.socket}
                    />
                </Modal.Content>
            </Modal>
        );
    }
}

export default ContainerModal;
