import React from 'react'
import { ResponsiveRadar as NivoRadar } from '@nivo/radar'
import { unahurPalette } from '@styles'
import { radarProps } from './props'
import styled from 'styled-components'

const PreRadar = ({ data }: radarProps) => (

  
  
  <NivoRadar
    data={data}
    keys={[ 'evaluacion', 'autoevaluation' ]}
    
    indexBy="variable"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: 'color' }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: 'background'}}
    dotBorderWidth={2}
    colors={[
      unahurPalette.unahurGreen.main,
      unahurPalette.unahurBlue.main
    ]}
    blendMode="multiply"
    motionConfig="wobbly"
  />

  
)



  



export const Radar = styled(PreRadar)`
    height: 360px;
`