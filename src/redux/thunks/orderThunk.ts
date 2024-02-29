import { getAllOrders } from '../actions/orderActions.ts';
import { OrderActionTypes } from '../types/orderTypes.ts';

export const getOrders = () => {
  return (dispatch: (orders: { type: string; payload: any[] }) => void) => {
    getAllOrders()
      .then((orders) => {
        dispatch({ type: OrderActionTypes.INIT_ORDERS, payload: orders });
      })
      .catch((err) => console.log(err));
  };
};
