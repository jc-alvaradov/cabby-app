export default function paymentReducer(payment = "cash", action) {
  switch (action.type) {
    case "CHANGE_PAYMENT":
      return action.payment;
    default:
      return payment;
  }
}
