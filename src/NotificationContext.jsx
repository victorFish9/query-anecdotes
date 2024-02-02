import { createContext, useContext, useReducer } from "react";

const initialState = {
    message: '',
    type: ''
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type
            }
        case 'HIDE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}


const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    const showNotification = (message, type) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: { message, type }
        })
    }

    const hidenNotification = () => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
    }

    return (
        <NotificationProvider value={{
            notification: state,
            showNotification,
            hidenNotification
        }} >
            {children}
        </NotificationProvider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}