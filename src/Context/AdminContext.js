import { createContext, useReducer } from 'react'

export const AdminContext = createContext()

export const adminReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_ADMIN':
            return {
                admin: action.payload
            }
        default:
            return state
    }
}

export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, {
        admin: false
    })

    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    )
}