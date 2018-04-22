import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Transactions from '../components/transactions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetUsers, GetTransactions, selectUser } from '../actions';
import '../bootstrap.min.css';
import '../bootstrap-grid.min.css';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.state = {userId: null}
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(GetUsers())
  }
  handleUserSelect(id, name) {
    const { dispatch } = this.props;
    dispatch(selectUser(name))
    dispatch(GetTransactions(id))
  }

  render() {
    const {users, transactions, isFetching, initLoader, selectedUser} = this.props;
    if (initLoader) {
      return <div>Loading...</div>
    }
    return (
      <div className="container">
       <div className="row">
         <Navbar users={users} selectUser={this.handleUserSelect} />
         <Transactions selectedUser={selectedUser} loading={isFetching} transactions={transactions} />
       </div>
     </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.array,
  transactions: PropTypes.array,
  isFetching: PropTypes.bool,
  initLoader: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  selectedUser: PropTypes.string
}

const mapStateToProps = state => {
  return {
    users: state.users,
    transactions: state.transactions,
    isFetching: state.isFetching,
    initLoader: state.initLoader,
    selectedUser: state.selectedUser
  }
}

export default connect(mapStateToProps)(App);
