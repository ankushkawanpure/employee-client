import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import DataGrid from '../Grid/DataGrid';
import ContainerModal from '../Modals/ContainerModal';

import './App.css';

class App extends Component {

    constructor() {
        super();

        this.server = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        this.socket = io.connect(this.server);

        this.state = {
            employees: [],
            online: 0
        };

        this.fetchData = this.fetchData.bind(this);
    }

    // Place socket.io code inside here
    componentDidMount() {
        this.fetchData();
        this.socket.on('visitor enters', data => this.setState({ online: data }));
        this.socket.on('visitor exits', data => this.setState({ online: data }));
        this.socket.on('add', data => this.handleEmployeeAdded(data));
        this.socket.on('update', data => this.handleEmployeeUpdated(data));
        this.socket.on('delete', data => this.handleEmployeeDeleted(data));
    }


    fetchData() {
        axios.get(`${this.server}/api/employees/`)
            .then((response) => {
                this.setState({ employees: response.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleEmployeeAdded = (employee) => {
        let employees = this.state.employees.slice();
        employees.push(employee);
        this.setState({ employees: employees });
    };


    handleEmployeeUpdated = (employee) => {
        let employees = this.state.employees.slice();
        for (let i = 0, n = employees.length; i < n; i++) {
            if (employees[i]._id === employee._id) {
                employees[i].name = employee.name;
                employees[i].email = employee.email;
                employees[i].address = employee.address;
                employees[i].basesalary = employee.basesalary;
                employees[i].deduction = employee.deduction;
                employees[i].takehomepay = employee.takehomepay;
                break;
            }
        }
        this.setState({ employees: employees });
    };

    handleEmployeeDeleted = (employee) => {
        let employees = this.state.employees.slice();
        employees = employees.filter(e => { return e._id !== employee._id; });
        this.setState({ employees: employees });
    };

    render() {

        let online = this.state.online;
        let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
        let noun = (online <= 1) ? 'person' : 'people';

        return (
            <div>
                <div className='App'>
                    <div className='App-header'>
                        <h2>Employee Portal</h2>
                    </div>
                </div>
                <div className='Appbody'>
                    <Container>
                        <ContainerModal
                            headerTitle='Add Employee'
                            buttonTriggerTitle='Add New Employee'
                            buttonSubmitTitle='Add'
                            buttonColor='green'
                            onEmployeeAdded={this.handleEmployeeAdded}
                            server={this.server}
                            socket={this.socket}
                        />
                        <em id='online'>{`${online} ${noun} ${verb} online.`}</em>
                        <DataGrid
                            onEmployeeUpdated={this.handleEmployeeUpdated}
                            onEmployeeDeleted={this.handleEmployeeDeleted}
                            employees={this.state.employees}
                            server={this.server}
                            socket={this.socket}
                        />
                    </Container>
                </div>
                <br/>
            </div>
        );
    }
}

export default App;
