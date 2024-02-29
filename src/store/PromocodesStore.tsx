import { makeAutoObservable, runInAction } from 'mobx';
import { getPromocodes } from './api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import axios from 'axios';
import { Item } from '../components/Promocode/Promocode';

class PromocodesStore {
  promocodes?: IPromiseBasedObservable<any>;
  constructor() {
    makeAutoObservable(this);
  }

  getPromocodesAction = async () => {
    this.promocodes = fromPromise(getPromocodes());
  };

  addPromocode = async ({ id, name, promocode, percent }: Item) => {
    await axios
      .post('http://localhost:3001/promocodes', {
        id: id,
        name: name,
        promocode: promocode,
        percent: percent,
      })
      .then((response) => {
        runInAction(() => {
          this.promocodes?.value.push({
            id: id,
            name: name,
            promocode: promocode,
            percent: percent,
          });
          console.log(response.data);
          console.log(this.promocodes);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deletePromocode = async (id: string) => {
    await axios
      .delete(`http://localhost:3001/promocodes/${id}`)
      .then(() => {
        runInAction(() => {
          const index = this.promocodes?.value.findIndex(
            (item: Item) => item.id === id
          );
          this.promocodes?.value.splice(index, 1);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editPromocode = async ({ id, name, promocode, percent }: Item) => {
    await axios
      .patch(`http://localhost:3001/promocodes/${id}`, {
        name: name,
        promocode: promocode,
        percent: percent,
      })
      .then(() => {
        runInAction(() => {
          const index = this.promocodes?.value.findIndex(
            (item: Item) => item.id === id
          );
          this.promocodes?.value.splice(index, 1, this.promocodes?.value);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new PromocodesStore();
