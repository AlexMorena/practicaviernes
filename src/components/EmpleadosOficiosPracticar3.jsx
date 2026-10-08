import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class EmpleadosOficiosPracticar3 extends Component {
    selectCaja = React.createRef();
    urlEmpleados = Global.urlApiEmpleados;

    state = {
        oficios: [],
        empleados: [],
        favorito: null
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

    componentDidMount = () => {
        this.cargarOficios();
    }
    
    buscarEmpleados = (event) => {
        event.preventDefault();
        let request = "api/Empleados/EmpleadosOficio/";
        let idOficio = this.selectCaja.current.value;

        axios.get(this.urlEmpleados + request + idOficio).then((response) => {
            this.setState({
                empleados: response.data
            })
        })
    }

    // 1. Completamos el método para guardar al empleado en el state
    oficioFavorito = (empleadoElegido) => {
        this.setState({
            favorito: empleadoElegido
        })
    }

    render() {
        return (
            <div>
                <h1>Empleados Oficios 3</h1>
                <h2>Oficios: </h2>
                <form>
                    <select ref={this.selectCaja}>
                    {
                        this.state.oficios.map((ofi, index) => {
                            return(<option key={index} value={ofi}>{ofi}</option>)
                        })
                    }
                    </select>
                    <button onClick={this.buscarEmpleados}>Buscar empleado</button>
                </form>
                {/* 2. El form se cierra aquí arriba para no interferir con otros botones */}

                <hr/>

                {/* 3. Dibujamos el empleado favorito solo si existe */}
                {
                    this.state.favorito != null && (
                        <div style={{ backgroundColor: "lightyellow", border: "1px solid gold" }}>
                            <h3>Favorito seleccionado: {this.state.favorito.apellido}</h3>
                            <p>Oficio: {this.state.favorito.oficio} | Salario: {this.state.favorito.salario}</p>
                        </div>
                    )
                }

                {/* 4. Dibujamos la lista de empleados con su botón */}
                {
                    this.state.empleados.map((emp, index) => {
                        return (
                            <div key={index} style={{}}>
                                <h4>{emp.apellido}</h4>
                                <h4>{emp.oficio}</h4>
                                <h4>{emp.salario}</h4>
                                <button onClick={() => this.oficioFavorito(emp)}>
                                    Seleccionar favorito
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}