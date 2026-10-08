import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class EmpleadosDepartamento2 extends Component {
    cadaId = React.createRef();
    urlEmpleados = Global.urlApiEmpleados;
    urlDepartamento = Global.urlApiDepartamentos;

    state = {
        departamentos: [],
        empleados: [],
        departamento: null
    }

    buscarEmpleados = (event) => {
        let request = "api/Empleados/EmpleadosDepartamento/";
        let idEmpleado = this.cadaId.current.value;

        axios.get(this.urlEmpleados + request + idEmpleado).then((response) => {
            this.setState({
                empleados: response.data,
                departamento: idEmpleado
            })
        })


    }

    cargarDepartamentos = () => {
        let request = "webresources/departamentos"

        axios.get(this.urlDepartamento + request).then((response) => {
            this.setState({
                departamentos: response.data
            })
        })
    }

    añadirEmpleado = (event) => {
        event.preventDefault();

        let aux = this.state.empleados
        aux.push("Nuevo empleado");
        this.setState({
            empleados: aux
        })

    }

    eliminarEmpleado = (event) => {
        event.preventDefault();
        let aux = this.state.empleados
        aux.splice(0, 1);
        this.setState({
            empleados: aux
        })

    }

    componentDidMount = () => {
        this.cargarDepartamentos();
    }


    render() {
        return (
            <div>
                <h1>Empleados por departamento INPUT</h1>
                <h2>Departamentos: </h2>
                {
                    this.state.departamentos.map((depart, index) => {
                        return (<h3 key={index}>{depart.nombre}</h3>)
                    })
                }
                <h2>Introduce el ID de un departamento para buscar empleados</h2>
                <input type="text" ref={this.cadaId}></input>
                <button onClick={this.buscarEmpleados}>
                    Buscar
                </button>
                {
                    this.state.empleados.map((empl, index) => {
                        return (<div key={index}><h3>Apellido: {empl.apellido}</h3>
                            <h3>Oficio: {empl.oficio}</h3>
                            <h3>Salario: {empl.salario}</h3>
                            <br></br></div>)
                    })
                }
                <button onClick={this.añadirEmpleado}>Añadir Empleado</button>
                <button onClick={this.eliminarEmpleado}>Eliminar Empleado</button>

            </div>
        )
    }
}
