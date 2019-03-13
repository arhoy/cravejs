import React, { Component } from 'react';
import PayPalExpressBtn from 'react-paypal-express-checkout';

class PayPal extends Component {
    render() {
  
        const onSuccess = (payment) => {
      /*    {"paid":true,
        "cancelled":false,
        "payerID":"RSNMKVPLSQ4J4",
        "paymentID":"PAYID-LSANMUI1RJ27191HE7268828",
        "paymentToken":"EC-9X6173414N9778749",
        "returnUrl":
        "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LSANMUI1RJ27191HE7268828&token=EC-9X6173414N9778749&PayerID=RSNMKVPLSQ4J4",
        "address":{"recipient_name":"Alex Hoy","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
        "email":"alex.cravejs@gmail.com"
        }
      */    
        this.props.transactionSuccess(payment);
      console.log("The payment was succeeded!", JSON.stringify(payment) );
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.toPay;
   
        const client = {
            sandbox: 'AQVjvLgzc_vlVHWoQ3IUm499Ub7NwlUj9GWdmvVKsYy_s2uXSrJ75ZXCn8gLoaHH94bgF-bood-U7BMS',
            production:''
        }
        return (
            <div>
                <PayPalExpressBtn 
                    client = {client} 
                    env = {env}
                    currency = {currency} 
                    total = {total}
                    onError = {onError}
                    onCancel = {onCancel}
                    onSuccess = {onSuccess}
                    style = {{
                        size: 'small',
                        color: 'blue',
                        shape: 'rect'
                    }}
                />
            </div>
        );
    }
}

export default PayPal;