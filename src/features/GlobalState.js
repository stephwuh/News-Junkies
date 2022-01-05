import React, {createContext, useReducer} from 'react';

import { categoryReducer } from './categoryReducer.js';

const initialState = {
    category: "latest"
}

export const GlobalContext = createContext(initialState) 

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState)
    
    return (

        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>

    )

}


