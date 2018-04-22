import { actions } from '../actions';

const initState = {
    isFetching: false,
    initLoader: true,
    users: [],
    transactions: [],
    error: null,
    userId: null,
    apiKey: null,
    ws: new WebSocket('wss://stage.decentgo.com:8090')
}

export function transactions(state = initState, action) {
    switch (action.type) {
        case 'START_REQUEST':
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            })
        case 'REQUEST_FAIL':
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false
            })
        case 'LOG_IN':
            return Object.assign({}, state, {
                userId: action.id
            })
        case 'SET_API_KEY':
            return Object.assign({}, state, {
                apiKey: action.id,
            })
        case 'SELECT_USER':
            return Object.assign({}, state, {
                selectedUser: action.user
            })
        case 'SET_USERS':
            return Object.assign({}, state, {
                users: action.users,
                initLoader: false
            })
        case 'SET_TRANSACTIONS':
            return Object.assign({}, state, {
                isFetching: false,
                transactions: action.transactions
            })
        default:
            return state;
    }
}

export default transactions;