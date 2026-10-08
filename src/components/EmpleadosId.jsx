import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'

export default class EmpleadosId extends Component {
    selectId = React.createRef();
    urlEmpleados = Global.urlApiEmpleados;

    state = {
        empleados: [],
        favorito: null,
        empleado: null
    }

    buscarEmpleadosId = (event) => {
        let idEmpleado = this.selectId.current.value;
        let request = "api/empleados/";

        axios.get(this.urlEmpleados + request + idEmpleado).then((response) => {
            this.setState({
                empleado: response.data
            })
        })
    }



    cargarEmpleados = () => {
        let request = "api/empleados";

        axios.get(this.urlEmpleados + request).then((response) => {
            this.setState({
                empleados: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarEmpleados();
    }

    render() {
        return (
            <div>
                <h1>Empleados por ID</h1>
                <form>
                    <select ref={this.selectId}>
                        {
                            this.state.empleados.map((empl, index) => {
                                return (<option key={index} value={empl.idEmpleado}>{empl.apellido}</option>)
                            })
                        }
                    </select>
                </form>
                {
                    this.state.empleado != null && (
                        <div>
                            <h3>Apellido: {this.state.empleado.apellido}</h3>
                            <h3>Oficio: {this.state.empleado.oficio}</h3>
                            <h3>Salario: {this.state.empleado.salario}</h3>
                        </div>
                    )
                }
                <button onClick={this.buscarEmpleadosId}>Buscar empleado</button>
            </div>
        )
    }
}
