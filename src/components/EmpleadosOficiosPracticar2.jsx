import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosOficiosPracticar2 extends Component {
    cajaSelect = React.createRef();
    urlEmpleados = Global.urlApiEmpleados
    state = {
        oficios: [],
        empleados: []
    }

    buscarEmpleados = (event) => {
        event.preventDefault();
        let oficioSeleccionado = this.cajaSelect.current.value;
        let request = "api/empleados/empleadosoficio/" + oficioSeleccionado;
        axios.get(this.urlEmpleados + request).then((response) => {
            this.setState({
                empleados: response.data
            })
        })
    }

    cargarOficios = () => {
        let request = "api/empleados"
        axios.get(this.urlEmpleados + request).then((response) => {
            let aux = [...new Set(response.data.map(elem => elem.oficio))];
            this.setState({
                oficios: aux
            })
        })
    }

    componentDidMount = () => {
        this.cargarOficios();
    }

    render() {
        return (
            <div>
                <h1>Empleados por oficio</h1>
                <form >
                    <select ref={this.cajaSelect}>
                        {
                            this.state.oficios.map((oficio, index) => {
                                return (<option key={index}>{oficio}</option>)
                            })
                        }
                    </select>
                    <button onClick={this.buscarEmpleados}>Buscar por oficio</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Oficio</th>
                                <th>Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.empleados.map((emp, index) => {
                                    return (<tr key={index}>
                                        <td>{emp.apellido}</td>
                                        <td>{emp.oficio}</td>
                                        <td>{emp.salario}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}
