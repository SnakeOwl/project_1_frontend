export default function  ReducerUser (state, action) {
    switch(action.type){

        case 'SET_USER':
            return {
                ...action,
                user: action.user
            }

        case "SET_BKEY":
            return {
                ...action,
                bkey: action.bkey
            }
            
        default:
            return state;
    }
}
