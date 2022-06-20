import { createContext, useReducer } from "react";
import exchanges from "../exchanges";
import { buildExchangesAsState } from '../utils';
import { State, Action, Direction, SortOrder, Context } from "../utils/types";

type ContextProviderProps = { children: React.ReactNode }

const ExchangeContext = createContext<Context | undefined>(undefined)

const exchangeReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SET_PRICE': {
      const { exchange, price } = payload as { exchange: string, price: number };
      const direction = 
        !!price && price > state[exchange].current ? Direction.Up
          : !!price && price < state[exchange].current ? Direction.Down
          : Direction.None
      return {
        ...state,
        [exchange]: {
          previous: !!price ? state[exchange].current : 0,
          current: !!price ? price : 0,
          direction,
          loading: false
        }
      }
    }
    case 'SET_ORDER': {
      return {
        ...state,
        order: payload
      }
    }
    case 'RESET_DATA': {
      return {
        order: SortOrder.None,
        ...buildExchangesAsState(exchanges)
      }
    }
    case 'SET_LOADING': {
      const clonedState = { ...state };
      exchanges.forEach(({ title }) => {
        clonedState[title] = {
          ...clonedState[title],
          loading: true
        }
      })
      return clonedState;
    }
    case 'STOP_LOADING': {
      const { exchange } = payload as { exchange: string };
      return {
        ...state,
        [exchange]: {
          ...state[exchange],
          loading: false
        }
      }
    }
    default:
      return state;
  }
};

const ExchangeProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(
    exchangeReducer, {
      order: SortOrder.None,
    ...buildExchangesAsState(exchanges)
  });

  return (
    <ExchangeContext.Provider value={{ state, dispatch }}>
      {children}
    </ExchangeContext.Provider>
  );
};

export { ExchangeProvider, ExchangeContext };
