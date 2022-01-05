


export const categoryReducer = (state, action) => {

    switch(action.type){
            
        case 'update category':
            return {category: action.payload}; 
       
        default:
            return state;

    }

}