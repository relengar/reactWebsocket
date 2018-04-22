import React from 'react';
import PropTypes from 'prop-types';

function Transactions({transactions, loading, selectedUser}) {
    if (loading) {
        return <div className="container col-10"><p>Loading...</p></div>
    }
    else if (!transactions || transactions.length <= 0) {
        return <div className="container col-10"><h1>{selectedUser}</h1><p>No transactions found for this user</p></div>
    }
    return (
        <div className="container col-10">
            <h1>{selectedUser}</h1>
            <h5>Transaction history</h5>
            <table style={{width: "20rem"}} className="table table-bordered table-striped">
                <thead><tr><th>From</th><th>To</th><th>Amount</th></tr></thead>
                <tbody>
                    {transactions && transactions.map((item, i) => {
                        if (i > 100) {
                            return '';
                        }
                        return (
                            <tr key={item.id + i}>
                                <td>{item.op[1].from}</td>
                                <td>{item.op[1].to}</td>
                                <td>{item.op[1].fee.amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

Transactions.propTypes = {
    transactions: PropTypes.array,
    loading: PropTypes.bool,
    selectedUser: PropTypes.string
}

export default Transactions;