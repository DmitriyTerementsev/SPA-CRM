export interface OrderState {
  orders: any[];
  loading: boolean;
  error: null | string;
}

export enum OrderActionTypes {
  FETCH_ORDERS = 'FETCH_ORDERS',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR',
  INIT_ORDERS = 'INIT_ORDERS',
  EDIT_ORDER = 'EDIT_ORDER',
  EDIT_ORDER_NUMBER = 'EDIT_ORDER_NUMBER',
}

interface FetchOrdersAction {
  type: OrderActionTypes.FETCH_ORDERS;
}

interface FetchOrdersSuccessAction {
  type: OrderActionTypes.FETCH_ORDERS_SUCCESS;
  payload: any[];
}

interface FetchOrdersErrorAction {
  type: OrderActionTypes.FETCH_ORDERS_ERROR;
  payload: string;
}

interface InitOrdersAction {
  type: OrderActionTypes.INIT_ORDERS;
  payload: any[];
}

interface EditOrderAction {
  type: OrderActionTypes.EDIT_ORDER;
  payload: {
    name: string;
    lastName: string;
  };
  id: number;
}

interface EditOrderNumberAction {
  type: OrderActionTypes.EDIT_ORDER_NUMBER;
  payload: string
  id: number;
}

export type OrderAction =
  | FetchOrdersAction
  | FetchOrdersSuccessAction
  | FetchOrdersErrorAction
  | InitOrdersAction
  | EditOrderAction
  | EditOrderNumberAction;
