import { Direction, Exchange, SortOrder } from "./types";

export const buildExchangesAsState = (exchanges: Array<any>) =>
  exchanges.reduce((acc, { title }: Exchange) => ({
    ...acc,
    [title.toLowerCase()]: {
      previous: 0,
      current: 0,
      direction: Direction.None,
      loading: false
    }
  }), {});

export const compareFn = ((
  { price: priceFirst }: { price: number },
  { price: priceSecond }: { price: number },
  order: SortOrder
) => {
  if (priceFirst === 0 && priceSecond > 0) return 1;
  if (priceSecond === 0 && priceFirst > 0) return -1;
  if (order === SortOrder.None) return 0;
  if (priceFirst > priceSecond) return order === SortOrder.Desk ? -1 : 1;
  if (priceFirst < priceSecond) return order === SortOrder.Desk ? 1 : -1;
  return 0;
})

export const formatTime = (epoch: number) =>
  new Date(epoch).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h23'
  })

export const extractBase = (pathname: string): string => {
  const [, base] = pathname.split('/');
  return base;
}

export const extractQuote = (pathname: string): string => {
  const [, , quote] = pathname.split('/');
  return quote;
}

export const extractPair = (pathname: string) =>
  `${extractBase(pathname)}${extractQuote(pathname)}`;
