import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

export const LoadingContext = createContext()
let tokenTimeout

export function LoadingContextProvider({ children = null }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useIsLoading() {
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  return { isLoading, setIsLoading }
}

LoadingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
