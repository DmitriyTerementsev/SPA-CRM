import {
  OrderState,
  OrderActionTypes,
  OrderAction,
} from '../types/orderTypes.ts';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const OrderReducer = (
  state = initialState,
  action: OrderAction
): OrderState => {
  console.log(action);
  switch (action.type) {
    case OrderActionTypes.INIT_ORDERS:
      return { loading: true, error: null, orders: action.payload };
    case OrderActionTypes.FETCH_ORDERS:
      return { loading: true, error: null, orders: [] };
    case OrderActionTypes.FETCH_ORDERS_SUCCESS:
      return { loading: false, error: null, orders: action.payload };
    case OrderActionTypes.FETCH_ORDERS_ERROR:
      return { loading: false, error: action.payload, orders: [] };
    case OrderActionTypes.EDIT_ORDER:
      return {
        loading: false,
        error: null,
        orders: state.orders.map((item) => {
          if (item.id === action.id) {
            console.log(item);
            return {
              ...item,
              user: action.payload,
            };
          }
          return item;
        }),
      };
      case OrderActionTypes.EDIT_ORDER_NUMBER:
      return {
        loading: false,
        error: null,
        orders: state.orders.map((item) => {
          if (item.id === action.id) {
            console.log(item);
            return {
              ...item,
              order_number: action.payload,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
