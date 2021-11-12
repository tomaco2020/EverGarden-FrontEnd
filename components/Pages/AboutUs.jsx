import React from 'react'
import MyCard from '../Card/Card'
import photo1 from '../../images/Ale_ska_chico.jpg'
import photo2 from '../../images/valores.png'
import photo3 from '../../images/nosotros_objetivos.png'
import photo4 from '../../images/sueños.png'

const aboutusinfo = [{
    title: "Fundador",
    subtitle: "Jorge Alejandro Skamelka",
    details:  "Arquitecto Argentino, Tucumano - recibido de la UNT - Su espiritu innovador y su fuerte conciencia ambiental lo llevo a pensar en soluciones verdes para una gran ciudad. Inspirado en los verdes cerros tucumanos donde su corazon late a toda maquina, tomo el concepto de la jardineria vertical, investigo los sistemas existentes en el mercado, analiso sus ventajas y desventajas constructivas y de costo y decidio  diseñar una propuesta liviana, con gran calidad y durabilidad a la cual le sumo facilidad de armado y mantenimiento.",
    info_url: photo1
},
{
    title: "Valores",
    subtitle: "Excelencia - Emocionalidad - Responsabilidad",
    details: "Ever Garden compone sus valores con la EXCELENCIA en los materiales utilizados, EMOCIONALIDAD al poder regalar naturaleza en lugares impensados, RESPONSABILIDAD en su diseño, armado y CONCIENCIA VERDE respecto al medio ambiente.",
    info_url: photo2
},
{
    title: "Objetivos",
    subtitle: "Sembrar naturaleza en el cemento",
    details: "Acercar la naturaleza a una gran ciudad es nuestro mayor objetivo. Con los jardines verticales de Ever Garden es posible forrar con verde los grandes puentes, construcciones de autopistas, paredes completas de edificios ... y asi incorporar Oxigeno a la vista en una ciudad agitada que NECESITA volver a los origenes naturales.",
    info_url: photo3
},
{
    title: "Sueños... ",
    subtitle: "Mejorar la calidad de vida",
    details: "Aportar flores, aromas, colores a una gran ciudad donde se perdieron los cantos de los pajaros y las abejas. Y asi poder caminar disfrutando de los azahares de primavera y las lavandas del otoño",
    info_url: photo4
}]

const AboutUs = () => {
   // console.log(aboutusinfo)
    return (
        <div>
          {aboutusinfo.map( (item,index) => {return (<MyCard info = {aboutusinfo[index]} />)} )}
        </div>
         )
}

export default AboutUs