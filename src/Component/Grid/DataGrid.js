/**
 * Created by ankush on 6/3/18.
 */
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import DeleteModal from '../Modals/DeleteModal';
import ContainerModal from "../Modals/ContainerModal";

class DataGrid extends Component {

    render() {

        let employees = this.props.employees;
        console.log(employees);
        employees = employees.map((employee) =>
            <Table.Row key={employee._id}>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>{employee.address}</Table.Cell>
                <Table.Cell>{employee.basesalary}</Table.Cell>
                <Table.Cell>{employee.deductions}</Table.Cell>
                <Table.Cell>{employee.takehomepay}</Table.Cell>
                <Table.Cell>
                    <ContainerModal
                        headerTitle='Edit Employee'
                        buttonTriggerTitle='Edit'
                        buttonSubmitTitle='Save'
                        buttonColor='blue'
                        employeeID={employee._id}
                        onEmployeeUpdated={this.props.onEmployeeUpdated}
                        server={this.props.server}
                        socket={this.props.socket}
                    />
                    <DeleteModal
                        headerTitle='Delete Employee'
                        buttonTriggerTitle='Delete'
                        buttonColor='black'
                        employee={employee}
                        onEmployeeDeleted={this.props.onEmployeeDeleted}
                        server={this.props.server}
                        socket={this.props.socket}
                    />
                </Table.Cell>
            </Table.Row>
        );

        // Make every new user appear on top of the list
        employees =  [...employees].reverse();

        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Base Salary</Table.HeaderCell>
                        <Table.HeaderCell>Deductions</Table.HeaderCell>
                        <Table.HeaderCell>Take Home pay</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees}
                </Table.Body>
            </Table>
        );
    }
}

export default DataGrid;
