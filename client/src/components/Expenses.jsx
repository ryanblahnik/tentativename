import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../redux/actions/postActions.js';

import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 2000,
      bills: 1700,
      editExpense: {
        id: 5,
        expense: 'Buffalo Wild Wings',
        cost: 20,
        category: 'Food',
        frequency: 'Once',
        date: '10/02/18'
      }
    }
    this.updateExpense = this.updateExpense.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchExpenses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense) {
      this.props.expenses.push(nextProps.expense);
    }
  }

  updateExpense(expense) {
    console.log(expense);
    const editExpense = {
      id: expense.id,
      expense: expense.expense,
      cost: expense.cost,
      category: expense.category,
      frequency: expense.frequency,
      date: expense.date
    }
    this.setState({
      editExpense: editExpense
    })
  }
  
  render() {
    return (
      <div>
        Income: {this.state.income}
        Expenses: {this.state.bills}
        Remainder: {this.state.income - this.state.bills}
        <tr>
          <th>Expense</th>
          <th>Cost</th>
          <th>Category</th>
          <th>Frequency</th>
          <th>Date</th>
          <th>Edit/Delete</th>
        </tr>
        {this.props.expenses.map(expense => {
          return (
            <tr>
              <td>{expense.expense}</td>
              <td>{`$${expense.cost}`}</td>
              <td>{expense.category}</td>
              <td>{expense.frequency}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => {this.updateExpense(expense)}}>Edit</button>
                <button onClick={() => {this.props.deleteExpense(expense)}}>Delete</button>
              </td>
            </tr>
          )
        })}
        <AddExpense />
        <EditExpense editExpense={this.state.editExpense}/>
      </div>
    )
  }
}

Expenses.propTypes = {
  fetchExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  expense: PropTypes.object.isRequired
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    expense: state.expenses.expense
  }
};

//mapdispatchtoprops
export default connect(mapStateToProps, { fetchExpenses, deleteExpense })(Expenses);