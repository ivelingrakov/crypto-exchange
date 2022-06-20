export type Exchange = {
  title: string;
  getPriceUrl: (pair: string) => string;
  historicalInfoUrl: (pair: string) => string;
  priceDataParser: (data: any) => any;
}

export type State = {
  // @ts-ignore
  order: SortOrder
  [key: string]: {
    previous: number,
    current: number,
    direction: Direction,
    loading: boolean
  }
}

export type Context = {
  state: State,
  dispatch: Dispatch
}

export type Dispatch = (action: Action) => void

export type Action = {
  type: 'SET_PRICE' | 'RESET_DATA' | 'SET_LOADING' | 'SET_ORDER'
  payload: { exchange: string, price: number } | SortOrder
}

export type Trade = {
  price: number
  volume: number
  time: number
  operation: string
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  None = 'none'
}

export enum SortOrder {
  Ask,
  Desk,
  None
}