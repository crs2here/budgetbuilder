import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
})

class IndexPage extends Component {
  state = {
    bills: [
      { name: "mortgage(1)", value: 2580, paid: false },
      { name: "life insurance(5)", value: 25, paid: false },
      { name: "netflix(5)", value: 11, paid: false },
      { name: "trash(3/6/9/12(6))", value: 63, paid: false },
      { name: "water(7)", value: 150, paid: false },
      { name: "motorcycle ins(19)", value: 17, paid: false },
      { name: "student loan(21)", value: 177, paid: false },
      { name: "spectrum(22)", value: 153, paid: false },
      { name: "electric(27)", value: 150, paid: false },
      { name: "hulu(29)", value: 8, paid: false },
      { name: "gas(31)", value: 20, paid: false },
      { name: "car insurance(30)", value: 27, paid: false },
      { name: "maddieCC", value: 0, paid: false },
      { name: "chrisCC", value: 0, paid: false },
      { name: "misc", value: 0, paid: false },
    ],
    paydates: [
      { date: "", amount: 0 },
      { date: "", amount: 0 }
    ],
    totalDue: 0,
    totalNet: 0,
    currentBalance: 0,
    bills2: [
      { name: "mortgage(1)", value: 2580, paid: false },
      { name: "life insurance(5)", value: 25, paid: false },
      { name: "netflix(5)", value: 11, paid: false },
      { name: "trash(3/6/9/12(6))", value: 63, paid: false },
      { name: "water(7)", value: 150, paid: false },
      { name: "motorcycle ins(19)", value: 17, paid: false },
      { name: "student loan(21)", value: 177, paid: false },
      { name: "spectrum(22)", value: 153, paid: false },
      { name: "electric(27)", value: 150, paid: false },
      { name: "hulu(29)", value: 8, paid: false },
      { name: "gas(31)", value: 20, paid: false },
      { name: "car insurance(30)", value: 27, paid: false },
      { name: "maddieCC", value: 0, paid: false },
      { name: "chrisCC", value: 0, paid: false },
      { name: "misc", value: 0, paid: false },
    ],       
  }

  handleBillChange = prop => event => {
    const newBillVal = event.target.value;
    const bills = this.state.bills.map(bill => {
      bill.value = (bill.name === prop) ? newBillVal : bill.value;
      return bill;
    });
    this.setState({ bills });
    this.calculateTotalDue();
  };

  handleCheck = prop => event => {
    const isChecked = event.target.checked;
    const bills = this.state.bills.map(bill => {
      bill.paid = (bill.name === prop) ? isChecked : bill.paid;
      return bill;
    });
    this.setState({ bills });
    this.calculateTotalDue();
  };

  handlePay = (prop, i) => event => {

    const newVal = event.target.value;

    const paydates = this.state.paydates.map((paycheck, index) => {
      if (index === i) {
        paycheck[prop] = newVal;
      }
      return paycheck;
    });
    this.setState({ paydates });
  }

  renderControls(bill) {
    const { name, value, paid } = bill;
    return (
      <div style={{ display: 'inline-flex' }}>
        <div>
          <FormControl margin="normal" required fullWidth key={name}>
            <InputLabel>{name}</InputLabel>
            <Input
              id={name}
              name={name}
              onChange={this.handleBillChange(name)}
              value={value}
            />
          </FormControl>
        </div>
        <div style={{ alignSelf: 'center' }}>
          <Checkbox
            color="primary"
            value={value}
            checked={paid}
            onChange={this.handleCheck(name)}
          />
        </div>
      </div>
    );
  }

  renderDates(paycheck, i) {
    const { date, amount } = paycheck;
    return (
      <div style={{ display: 'inline-flex' }}>
        <div>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>pay date</InputLabel>
            <Input
              onChange={this.handlePay("date", i)}
              value={date}
            />
          </FormControl>
        </div>
        <div style={{ alignSelf: 'center' }}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>amount</InputLabel>
            <Input
              onChange={this.handlePay("amount", i)}
              value={amount}
            />
          </FormControl>
        </div>
      </div>
    );
  }

  calculateTotalDue() {
    const { bills } = this.state;
    const payments = bills.map((bill) => (bill.paid) ? 0 : Number(bill.value));
    const totalDue = payments.reduce((accumulator, currentValue) => Math.abs(accumulator + currentValue));
    this.setState({ totalDue })
  }

  calculateTotalNet() {
    const { currentBalance, paydates, totalDue } = this.state;
    const paycheckAmt = parseInt(paydates[0].amount);
    const expectedBalance = parseInt(currentBalance) + paycheckAmt;
    const totalNet = expectedBalance - parseInt(totalDue)

    this.setState({ totalNet })
  }

  componentDidMount() {
    this.calculateTotalDue();
  }

  render() {
    const { props: { classes }, state: { bills, bills2, currentBalance, totalDue, paydates } } = this

    return (
      <main>
        {paydates.map((paycheck, i) => this.renderDates(paycheck, i))}

        <FormControl margin="normal" required fullWidth>
          <InputLabel>Current Balance</InputLabel>
          <Input
            onChange={(currentBalance) => this.setState({ currentBalance: currentBalance.target.value })}
            value={currentBalance} />
        </FormControl>

        <form className={classes.form}>
          {bills.map((bill) => this.renderControls(bill))}
        </form>

        <h3>Balance + Check = {parseInt(currentBalance) + parseInt(paydates[0].amount)}</h3>
        <h3>Total Due = {totalDue}</h3>
        <h3>Net Balance = {(parseInt(currentBalance) + parseInt(paydates[0].amount)) - parseInt(totalDue)}</h3>     
      </main>

    )
  }
}

export default withStyles(styles)(IndexPage)

