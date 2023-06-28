export default function  ReducerUser (state, action) {
    switch(action.type){

        case 'SET_TOKEN':
            return {
                ...action,
                token: action.token
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
