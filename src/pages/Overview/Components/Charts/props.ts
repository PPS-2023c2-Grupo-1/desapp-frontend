import { BarDatum, ComputedDatum } from '@nivo/bar'

export interface barData extends BarDatum {
  tp: string,
  minimo: number,
  promedio: number,
  maximo: number,
}

export interface barDataVariables extends BarDatum {
  tp: string,
  variable1: number,
  variable2: number,
  variable3: number,
  variable4: number,
  variable5: number,


}

export interface pieData extends Record<string, unknown> {
  id: string,
  label: string,
  value: number
}

export interface radarData extends Record<string, unknown> {
  average: number,
  student: number,
  variable: string
}

export interface containerProps {
  height?: string,
  width?: string,
}

//export interface barProps { data: barData[] }

export interface barProps {
  data: barData[];
}

export interface barPropsVariable{
  data: barDataVariables[];
}


export interface pieProps { data: pieData[] }
export interface radarProps { data: radarData[] }

export interface chartProps extends containerProps{
  children?: React.ReactNode,
}
