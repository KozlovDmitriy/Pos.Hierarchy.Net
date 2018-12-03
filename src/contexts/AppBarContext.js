import { createContext } from 'react'

const AppBarContext = createContext({})

export const AppBarContextProvider = AppBarContext.Provider
export const AppBarContextConsumer = AppBarContext.Consumer
