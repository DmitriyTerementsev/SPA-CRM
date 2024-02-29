import { makeAutoObservable, runInAction } from 'mobx';
import { getProducts } from './api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import axios from 'axios';
import { Item } from '../components/Products/Products';

class ProductsStore {
  products?: IPromiseBasedObservable<any>;
  constructor() {
    makeAutoObservable(this);
  }

  getProductsAction = async () => {
    this.products = fromPromise(getProducts());
  };

  editProduct = async ({
    id,
    nameFrom1C,
    name,
    codeFrom1C,
    description,
    images,
    price,
    brand
  }: Item) => {
    await axios
      .patch(`http://localhost:3001/products/${id}`, {
        nameFrom1C: nameFrom1C,
        name: name,
        codeFrom1C: codeFrom1C,
        description: description,
        images: images,
        price: price,
        brand: brand
      })
      .then((res) => {
        runInAction(() => {
          const index = this.products?.value.findIndex(
            (item: Item) => item.id === id
          );
          this.products?.value.splice(index, 1, res);
          console.log(res.data)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new ProductsStore();
