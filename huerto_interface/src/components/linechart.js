import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { Button, Container, Grid, Box } from '@mui/material'
import "../App.css";
import { CSVLink } from 'react-csv';

class LineChart extends Component {

    //Seccion de Grafica
    state = { //json de descripcion de la grafica
        line1: {
            x: [], //Valores de Inicio
            y: [],
            type: 'scatter',
            name: 'Presion',
            fill: 'tozeroy',
            fillcolor: '#E5E5E5', //Color del fill
            marker: {
                color: '#8FDCDF', //Color de la linea
                line: {
                    color: '#7ACDD0', //Color de la bolita
                    width: 2
                },
            },
        },
        layout: {
            datarevision: 0,
            title: "Presión del Sistema",
            font: { size: 14 },
            autosize: true,
            xaxis: {
                title: 'Tiempo',
            },
            yaxis: {
                title: 'Libras por Pulgada Cuadrada (PSI)',
                range: [100, 200],
            },
        },
        config: {
            displaylogo: false,
        },
        style: { width: "100%", height: "75vh" },
        revision: 0,
        show_option: 1,
        fullhist_x: [],
        fullhist_y: [],
        button_color: ['secondary', 'primary', 'primary', 'primary', 'primary', 'primary'],
    }

    componentDidMount() { //Si carga bien el programa, refrescarla cada 1000 ms
        setInterval(this.refreshGraphic, 200);
    }

    refreshGraphic = () => {  // Refrescado de la Pagina
        const { line1, layout, fullhist_x, fullhist_y, show_option } = this.state;

        fullhist_x.push(this.state.revision + 1);
        fullhist_y.push((Math.random() * 50) + 120);

        if (show_option === 1) { // Tiempo Real
            line1.x = fullhist_x
            line1.y = fullhist_y
        } else if (show_option === 2) { // 3 horas
            line1.x = fullhist_x.slice(Math.max(fullhist_x.length - 3, 0))
            line1.y = fullhist_y.slice(Math.max(fullhist_y.length - 3, 0))
        } else if (show_option === 3) { // 7 Horas
            line1.x = fullhist_x.slice(Math.max(fullhist_x.length - 7, 0))
            line1.y = fullhist_y.slice(Math.max(fullhist_y.length - 7, 0))
        } else if (show_option === 4) { // 24 Horas
            line1.x = fullhist_x.slice(Math.max(fullhist_x.length - 24, 0))
            line1.y = fullhist_y.slice(Math.max(fullhist_y.length - 24, 0))
        } else if (show_option === 5) {
            line1.x = fullhist_x.slice(Math.max(fullhist_x.length - 100, 0))
            line1.y = fullhist_y.slice(Math.max(fullhist_y.length - 100, 0))
        } else if (show_option === 6) {
            line1.x = fullhist_x.slice(Math.max(fullhist_x.length - 300, 0))
            line1.y = fullhist_y.slice(Math.max(fullhist_y.length - 300, 0))
        }

        //No se modifica, actualiza la grafica
        this.setState({ revision: this.state.revision + 1 });
        layout.datarevision = this.state.revision + 1;
    }

    changeColor = (x) => {
        if (x === 1) {
            this.setState({ button_color: ['secondary', 'primary', 'primary', 'primary', 'primary', 'primary'] });
        } else if (x === 2) {
            this.setState({ button_color: ['primary', 'secondary', 'primary', 'primary', 'primary', 'primary'] });
        } else if (x === 3) {
            this.setState({ button_color: ['primary', 'primary', 'secondary', 'primary', 'primary', 'primary'] });
        } else if (x === 4) {
            this.setState({ button_color: ['primary', 'primary', 'primary', 'secondary', 'primary', 'primary'] });
        } else if (x === 5) {
            this.setState({ button_color: ['primary', 'primary', 'primary', 'primary', 'secondary', 'primary'] });
        } else if (x === 6) {
            this.setState({ button_color: ['primary', 'primary', 'primary', 'primary', 'primary', 'secondary'] });
        }

    }

    changeTime = (x) => {
        if (x === 1) {
            this.setState({ show_option: 1 }); //Tiempo Real
        } else if (x === 2) {
            this.setState({ show_option: 2 });//3 horas
        } else if (x === 3) {
            this.setState({ show_option: 3 });//7 horas
        } else if (x === 4) {
            this.setState({ show_option: 4 });//24 horas
        } else if (x === 5) {
            this.setState({ show_option: 5 });//30 dias
        } else if (x === 6) {
            this.setState({ show_option: 6 });//90 dias
        }
    }

    downloadData = () => {
        let datatodownload = [{tiempo: this.state.line1.x}]
        return datatodownload

        /*
        console.log('SE CORRIO DOWNLOAD DATA')
        let datatodownload = [{}]
        for (let i = 0; i<= this.state.line1.x.length ;i++) {
            datatodownload[{i}] = datatodownload + "tiempo: " + this.state.line1.x[i] + ',';
        }

        console.log(datatodownload)
        return datatodownload
        */
    }

    render() {

        return (

            <div>
                <Grid
                    container
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[0]}
                            onClick={() => {
                                this.changeColor(1)
                                this.changeTime(1)
                            }}
                        >
                            Tiempo Real
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[1]}
                            onClick={() => {
                                this.changeColor(2)
                                this.changeTime(2)
                            }}
                        >
                            3 Horas
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[2]}
                            onClick={() => {
                                this.changeColor(3)
                                this.changeTime(3)
                            }}
                        >
                            7 Horas
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[3]}
                            onClick={() => {
                                this.changeColor(4)
                                this.changeTime(4)
                            }}
                        >
                            24 Horas
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[4]}
                            onClick={() => {
                                this.changeColor(5)
                                this.changeTime(5)
                            }}
                        >
                            30 Dias
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color={this.state.button_color[5]}
                            onClick={() => {
                                this.changeColor(6)
                                this.changeTime(6)
                            }}
                        >
                            90 Dias
                        </Button>
                    </Grid>
                </Grid>

                <Container className="plot_margins">
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
                    <Grid
                        container
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item>
                            <Box sx={{ height: 55 }}>
                                <CSVLink
                                    data={this.downloadData()}
                                    filename={'pruebadownload.csv'}
                                >
                                    <Button variant="outlined"> Descarga </Button>
                                </CSVLink>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default LineChart