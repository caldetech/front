import currency from 'currency.js'

export const parseBRL = (value: string) => {
  return currency(value, {
    separator: ".",
    decimal: ",",
    symbol: "R$"
  }).value
}