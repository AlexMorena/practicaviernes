import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class EmpleadosOficiosPracticar extends Component {
    cajaSelect = React.createRef();
    urlEmpleados = Global.urlApiEmpleados;

    state = {
        empleados: [],
        oficios: []
    }

    cargarOficios = () => {
        let request = "api/empleados";
        axios.get(this.urlEmpleados + request).then((response) => {
            let aux = [...new Set(response.data.map(elem => elem.oficio))];
            this.setState({
                oficios: aux
            })
        })
    }

    buscarEmpleados = (event) => {
        event.preventDefault();
        let request = "api/empleados";
        axios.get(this.urlEmpleados + request).then((response) => {
            this.setState({
                empleados: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarOficios();
    }

    render() {
        return (
            <div>
                <h1>Practicar</h1>
                <form ref={this.cajaSelect}>
                    <select>
                        {
                            this.state.oficios.map((oficio, index) => {
                                return (<option key={index}>{oficio}</option>)
                            })
                        }
                    </select>
                    <br></br>
                    <button onClick={this.buscarEmpleados}>
                        Buscar empleado
                    </button>
                </form>
                {
                    this.state.empleados.map((emp, index) => {
                        return (<div key={index}>
                            <h2>{emp.oficio}</h2>
                            <h2>{emp.apellido}</h2>
                            <h2>{emp.salario}</h2>
                            <br></br>
                        </div>)
                    })
                }
            </div>
        )
    }
}
