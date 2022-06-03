import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../App.css";

const Gaugehumidity = ({humidity}) => {
    return (
        <div style={{ width: '70%', height: '70%', marginLeft: '14%' }}>
            <CircularProgressbar
                value={humidity} //Valor
                minValue={0}
                maxValue={100}
                text={`${humidity} %`} //Texto del valor
                circleRatio={0.75}
                styles={buildStyles({
                    rotation: 0.625, // Rotacion del gauge
                    strokeLinecap: 'round', //'butt' para flat o 'round' para redondo
                    textSize: '16px', //Tamaño del texto
                    pathTransitionDuration: 0.5, //duracion de la animacion
                    pathColor: `rgba(62, 152, 199, ${100 / 100})`, //Color del recorrido (fondo)
                    textColor: '#99D9EA', //Color del Texto
                    trailColor: '#d6d6d6', //Color del Trazo
                })}
            />
        </div>
    )
}

export default Gaugehumidity;