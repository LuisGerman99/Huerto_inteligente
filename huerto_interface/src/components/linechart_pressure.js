import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { Container} from '@mui/material'
import "../App.css";

class LineChart extends Component {

    //Seccion de Grafica
    state = { //json de descripcion de la grafica
        line1: {
            x: [], //Valores de Inicio
            y: [],
            type: 'scatter',
            name: 'Presion',
            fill: 'tozeroy',
            fillcolor: '#50AAFF', //Color del fill
            marker: {
                color: '#0080FF', //Color de la linea
                line: {
                    color: '#0080FF', //Color de la bolita
                    width: 2
                },
            },
        },
        layout: {
            datarevision: 0,
            title: "Historial de Nivel del Agua",
            font: { 
                size: 14, 
                color: '#fff', 
            },
            autosize: true,
            xaxis: {
                title: 'Tiempo (s)',
                gridcolor: '#1F416B', //Color dle grid en eje X
            },
            yaxis: {
                title: 'Psi',
                range: [0, 100],
                gridcolor: '#1F416B', //Color del grid en eje Y
            },
            plot_bgcolor: '#0F2846', //Color del ploteo de la grafica
            paper_bgcolor: '#0F2846', //Color del paper de la grafica
        },
        config: {
            displaylogo: false,
        },
        style: { width: "100%", height: "40vh" },
        revision: 0,
        fullhist_x: [],
        fullhist_y: [],
    }

    componentDidMount() { //Si carga bien el programa, refrescarla cada 1000 ms
        const { line1, layout, fullhist_x, fullhist_y } = this.state;
        fullhist_x.push(0);

        fetch('https://hello-world-c1c6d-default-rtdb.firebaseio.com/Sensors/Huerto/Agua.json').then(response => {
            return response.json();
        }).then(data => {
            fullhist_y.push(data);
        }).catch(err => {
            console.log("ERROR AL HACER FETCH")
        });

        line1.x = fullhist_x
        line1.y = fullhist_y

        //No se modifica esta seccion
        this.setState({ revision: this.state.revision + 1 });
        layout.datarevision = this.state.revision + 1;

        setInterval(this.refreshGraphic, 2000);
    }

    refreshGraphic = () => {  // Refrescado de la Pagina
        const { line1, layout, fullhist_x, fullhist_y } = this.state;

        fullhist_x.push(this.state.revision * 2);

        fetch('https://hello-world-c1c6d-default-rtdb.firebaseio.com/Sensors/Huerto/Agua.json').then(response => {
            return response.json();
        }).then(data => {
            fullhist_y.push(data);
        }).catch(err => {
            console.log("ERROR AL HACER FETCH")
        });

        line1.x = fullhist_x
        line1.y = fullhist_y

        //No se modifica esta seccion
        this.setState({ revision: this.state.revision + 1 });
        layout.datarevision = this.state.revision + 1;
    }

    render() {
        return (
            <div>
                <Container className="plot_pressure">
                    <Plot
                        data={[
                            this.state.line1,
                        ]}
                        layout={this.state.layout}
                        revision={this.state.revision}
                        config={this.state.config}
                        style={this.state.style}
                        useResizeHandler
                        graphDiv="graph"
                    />
                </Container>
            </div>
        );
    }
}

export default LineChart