import { BarDatum } from '@nivo/bar'


export interface radarData extends Record<string, unknown> {
  average?: number | string,
  evaluacion:number | string,
  autoevaluation: number | string ,
  variable: string,
  variable2:string,
  
  
}

export interface containerProps {
  height?: string,
  width?: string,
}

export interface radarProps { data: radarData[]  }


