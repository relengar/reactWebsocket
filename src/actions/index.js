import { sendAndRetrieve } from './helpers';

function StartRequest() {
    return {
        type: 'START_REQUEST'
    };
}
function FailRequest(error) {
    return {
        error,
        type: 'REQUEST_FAIL'
    }
}

function GetApiKey(id) {
    return {
        id,
        type: 'SET_API_KEY'
    }
}

function LogIn(id) {
    return {
        id,
        type: 'LOG_IN'
    }
}

function setUsers(users) {
    return {
        type: 'SET_USERS',
        users
    }
}

function setTransactions(transactions, pagination) {
    return {
        transactions,
        pagination,
        type: 'SET_TRANSACTIONS'
    }
}

export function selectUser(user) {
    return {
        type: 'SELECT_USER',
        user
    }
}

export function GetUsers(users) {
    return (dispatch, getState) => {
        const { ws } = getState();
        sendAndRetrieve('{"id":1,"method":"call","params":[1,"login",["",""]]}', ws).then(resp => {
            dispatch(LogIn(resp.id));
            sendAndRetrieve(`{"id":${resp.id}, "method":"call", "params":[0,"lookup_accounts",["",100]]}`, ws)
            .then(data => {
                dispatch(setUsers(data.result));
            })
        });
    }
}

export function GetTransactions(id, action) {
    return (dispatch, getState) => {
        dispatch(StartRequest());
        const { ws, userId, apiKey, pagination, selectedUser } = getState();
        if (apiKey) {
            const uri = `{"id":${userId},"method":"call","params":[${apiKey},"get_relative_account_history",["${id}",1,100,8000]]}`;
            sendAndRetrieve(uri, ws)
                .then(data => {
                    dispatch(setTransactions(data.result), pagination);
                })
        }
        else {
            sendAndRetrieve('{"id":2,"method":"call","params":[1,"history",[]]}}', ws).then(resp => {
                dispatch(GetApiKey(resp.id));
                const uri = `{"id":${userId},"method":"call","params":[${resp.id},"get_relative_account_history",["${id}",1,100,8000]]}`;
                sendAndRetrieve(uri, ws)
                .then(data => {
                    dispatch(setTransactions(data.result, pagination));
                })
            })
        } 
    }
}