import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class EmpleadosDepartamento extends Component {
    urlDepartamentos = Global.urlApiDepartamentos;
    urlEmpleados = Global.urlApiEmpleados;
    cajaId = React.createRef();

    state = {
        departamentos: [],
        empleados: []
    }

    buscarEmpleados = (event) => {
        event.preventDefault();
        let request = "api/Empleados/EmpleadosDepartamento/";
        let numDepartamento = this.cajaId.current.value;

        axios.get(this.urlEmpleados + request + numDepartamento).then((response) => {
            this.setState({
                empleados: response.data
            })
        })

    }

    loadDepartamentos = () => {
        let request = "webresources/departamentos"

        axios.get(this.urlDepartamentos + request).then((response) => {
            this.setState({
                departamentos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }


    render() {
        return (
            <div>
                <h1>Empleados por departamentos</h1>
                <form>
                    <select ref={this.cajaId}>
                    {
                        this.state.departamentos.map((depar, index) => {
                            return (<option key={index} value={depar.numero}>{depar.nombre}</option>)
                        })
                    }
                    </select>
                    <button onClick={this.buscarEmpleados}>
                        Buscar empleados
                    </button>
                    {
                        this.state.empleados.map((empl, index) => {
                            return (<div key={index}><h3>Apellido: {empl.apellido}</h3>
                            <h3>Oficio: {empl.oficio}</h3>
                            <h3>Salario: {empl.salario}</h3>
                            <br></br></div>)
                        })
                    }
                </form>
            </div>
        )
    }
}
