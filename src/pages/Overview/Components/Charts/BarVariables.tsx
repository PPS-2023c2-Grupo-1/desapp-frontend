import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { unahurPalette } from '@styles'
import {  barPropsVariable } from './props'


export const BarVariables = ({ data }: barPropsVariable) => {

// Inicializa un array vacío para almacenar los nombres de las variables



    let max = data ? Math.max(...data.map(x => x.tp.length)) * 7 : 0;
    
    
    return (    
                 <ResponsiveBar
        
        colors={[
            unahurPalette.unahurRed.main,
            unahurPalette.unahurGreen.main,
            unahurPalette.unahurGrey.main,
            unahurPalette.unahurBlue.main,
            unahurPalette.unahurOrange.main
        ]}
        data={data}
        keys={[
          
  
            'variable1',
            'variable2',
            'variable3',
            'variable4',
            'variable5',
        ]}
        indexBy="tp"
        margin={{top: 50, right: 60, bottom: 50, left: max}}
        padding={0.3}
        innerPadding={1}
        groupMode="grouped"
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        borderColor={{
            from: 'color',
            modifiers: [
                ['darker', 1.6]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Variables - Autoevaluación',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Trabajo Practico',
            legendPosition: 'middle',
            legendOffset: -350
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={'#ffffff'}
        layout={'horizontal'}
    />
    
       
        
    );
}
