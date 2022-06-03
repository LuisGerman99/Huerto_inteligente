import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, ThemeProvider, createTheme, Box, Paper } from '@mui/material'
import GaugePressure from '../components/gauge_pressure'
import GaugeTemperature from '../components/gauge_temp'
import GaugeHumidity from '../components/gauge_humidity'
import LineChartPressure from '../components/linechart_pressure'
import LineChartTemperature from '../components/linechart_temp'
import LineChartHumidity from '../components/linechart_humidity'

import "../App.css";

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                //Modificacion 1
                {
                    props: {
                        variant: "h5",
                    },
                    style: {
                        fontSize: 25,
                        fontWeight: 450,
                    },
                },
            ],
        },
    },
});



const HuertoInt = () => {

    const [pressure, setPressure] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [temperature, setTemperature] = useState(0)
    
    //FUNCION PARA INICIARLIZAR LAS VARIABLES
    useEffect( () => {
        fetch('https://hello-world-c1c6d-default-rtdb.firebaseio.com/Sensors/Huerto.json').then(response => {
            return response.json();
        }).then(data => {
            setPressure(data.Agua);
            setHumidity(data.Humedad)
            setTemperature(data.Temperatura)
        }).catch(err => {
            console.log("ERROR AL HACER FETCH")
        });
    }, [])

    //FUNCION PARA REFRESCAR CADA CIERTO TIEMPO
    setInterval(function () {
        fetch('https://hello-world-c1c6d-default-rtdb.firebaseio.com/Sensors/Huerto.json').then(response => {
            return response.json();
        }).then(data => {
            setPressure(data.Agua);
            setHumidity(data.Humedad)
            setTemperature(data.Temperatura)
        }).catch(err => {
            console.log("ERROR AL HACER FETCH")
        });
    }, 2000);

    return (
        <Box class="huerto_page">
            <Container maxWidth>
                <Box sx={{ flexGrow: 1 }}>
                    <Paper elevation={24} sx={{ backgroundColor: '#0F2846' }}>
                        <Grid
                            container
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={4}>
                                <Typography variant="h5" component="div" align='left' className="text_left_titlebar" gutterBottom> Proyecto Final - Redes Industriales </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h4" component="div" align='center' className="text_middle_titlebar" gutterBottom> Huerto Automatizado </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5" component="div" align='right' className="text_right_titlebar" gutterBottom> Equipo #3 </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>


                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={4}>
                        <Paper elevation={24} sx={{ backgroundColor: '#0F2846' }}>
                            <Container className="section_setup">
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5" component="div" align='center' className="font_color" gutterBottom> Nivel de Agua </Typography>
                                </ThemeProvider>
                                <GaugePressure pressure={pressure} />
                                <LineChartPressure />
                            </Container>
                        </Paper>
                    </Grid>


                    <Grid item xs={4} >
                        <Paper elevation={24} sx={{ backgroundColor: '#0F2846' }}>
                            <Container className="section_setup">
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5" component="div" align='center' className="font_color" gutterBottom> Temperatura </Typography>
                                </ThemeProvider>
                                <GaugeTemperature temp={temperature}/>
                                <LineChartTemperature />
                            </Container>
                        </Paper>
                    </Grid>


                    <Grid item xs={4}>
                        <Paper elevation={24} sx={{ backgroundColor: '#0F2846' }}>
                            <Container className="section_setup">
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5" component="div" align='center' className="font_color" gutterBottom> Humedad </Typography>
                                </ThemeProvider>
                                <GaugeHumidity humidity={humidity}/>
                                <LineChartHumidity />
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
};

export default HuertoInt;