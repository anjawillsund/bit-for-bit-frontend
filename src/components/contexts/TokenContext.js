import React, { createContext, useContext } from 'react'

/**
 * Context for managing the token and performing authenticated requests.
 */
export const TokenContext = createContext()

/**
 * Provides the token context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The JSX element representing the TokenContextProvider component.
 */
const TokenContextProvider = ({ children }) => {
  /**
   * Performs a fetch request with the token added to the headers.
   *
   * @param {string} url - The URL for the fetch request.
   * @param {Object} options - The options for the fetch request.
   * @returns {Promise<Response>} The fetch response promise.
   */
  const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token') // Retrieve the token from local storage

    // Add the token to the request headers
    const headers = {
			'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    // Merge the provided headers with the token header
    options.headers = { ...options.headers, ...headers }

		// If the request body is provided and is an object, convert it to a URL-encoded string
		if (options.body && typeof options.body === 'object') {
      options.body = new URLSearchParams(options.body).toString()
    }

    // Perform the fetch request with the updated headers
    const response = await fetch(url, options)
    return response
  }

  return (
    <TokenContext.Provider value={fetchWithToken}>
			{children}
		</TokenContext.Provider>
  )
}

const useTokenContext = () => useContext(TokenContext)

export { TokenContextProvider, useTokenContext }
