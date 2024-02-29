import PopupWithForm from '../PopupWithForm/PopupWithForm.tsx';
import styles from '../PopupWithForm/PopupWithForm.module.scss';
import React, { useEffect, useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: any;
  handleEditOrder: (e: React.FormEvent<HTMLFormElement>, item: any) => void;
}

function PopupOrders({
  isOpen,
  onClose,
  selectedOrder,
  handleEditOrder,
}: PopupProps) {
  const [isSelect, setIsSelect] = useState(selectedOrder.delivery_type);
  const [userName, setUserName] = useState('');
  const [userOrder, setUserOrder] = useState('');
  const [userDate, setUserDate] = useState('');

  useEffect(() => {
    if (selectedOrder.user === undefined) {
      setUserName('');
      setUserOrder('');
      setUserDate('');
    } else {
      setUserName(selectedOrder.user.name + ' ' + selectedOrder.user.lastName);
      setUserOrder(selectedOrder.order_number);
      setUserDate(selectedOrder.date);
    }
  }, [selectedOrder]);

  useEffect(() => {
    selectedOrder.delivery_type === 'PICKUP'
      ? setIsSelect('Самовывоз')
      : setIsSelect('Доставка');
  }, [selectedOrder]);

  const pickUpValue: string = 'Самовывоз';
  const deliveryValue: string = 'Доставка';
  const cashValue: string = 'Наличными курьеру';
  const terminalValue: string = 'Онлайн';

  const handleOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelect(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value.trim());
  };

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserOrder(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDate(e.target.value);
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className={styles.popup__container}>
        <form
          className={styles.form}
          onSubmit={(e) =>
            handleEditOrder(e, { userName, selectedOrder, userOrder, userDate })
          }
        >
          <div className={styles.popup__buttons}>
            <button
              type='button'
              className={styles.popup__button}
              onClick={onClose}
            >
              Закрыть
            </button>
            <button
              type='submit'
              className={`${styles.popup__button} ${styles.popup__button_submit}`}
            >
              Подтвердить
            </button>
          </div>
          <div className={styles.form__container}>
            <p className={styles.form__label}>Заказчик</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Заказчик'
              value={userName}
              onChange={handleChangeName}
              required
            />
            <p className={styles.form__label}>Номер заказа</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Номер заказа'
              value={userOrder}
              onChange={handleChangeOrder}
              required
            />
            <p className={styles.form__label}>Дата оформления</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Дата оформления'
              value={userDate}
              onChange={handleChangeDate}
              required
            />

            <p className={styles.form__label}>Способ оплаты</p>
            <select
              className={styles.form__select}
              placeholder=''
              onChange={(e) => {
                console.log(e);
              }}
            >
              <option value=''>
                {selectedOrder.order_type === 'COURIER_CASH'
                  ? cashValue
                  : terminalValue}
              </option>
              <option value={cashValue}>Наличными курьеру</option>
              <option value={terminalValue}>Онлайн</option>
            </select>

            <p className={styles.form__label}>Способ получения</p>
            <select
              className={styles.form__select}
              placeholder=''
              onChange={(e) => {
                handleOptionValue(e);
              }}
              required
            >
              <option value=''>
                {selectedOrder.delivery_type === 'PICKUP'
                  ? pickUpValue
                  : deliveryValue}
              </option>
              <option value={pickUpValue}>Самовывоз</option>
              <option value={deliveryValue}>Доставка</option>
            </select>
            {isSelect === 'Самовывоз' ? (
              <>
                <p className={styles.form__label}>Пункт самовывоза</p>
                <input
                  type='text'
                  className={styles.form__input}
                  placeholder='Пункт самовывоза'
                  required
                />
              </>
            ) : isSelect === 'Доставка' ? (
              <>
                <div className={styles.form__inputs}>
                  <div className={styles.form__element}>
                    <p className={styles.form__label}>Город</p>
                    <input
                      type='text'
                      className={`${styles.form__input} ${styles.form__input_delivery}`}
                      placeholder='Город'
                      required
                    />
                  </div>
                  <div className={styles.form__element}>
                    <p className={styles.form__label}>Улица</p>
                    <input
                      type='text'
                      className={`${styles.form__input} ${styles.form__input_delivery}`}
                      placeholder='Улица'
                      required
                    />
                  </div>
                </div>
                <div className={styles.form__inputs}>
                  <div className={styles.form__element}>
                    <p className={styles.form__label}>Дом</p>
                    <input
                      type='text'
                      className={`${styles.form__input} ${styles.form__input_delivery}`}
                      placeholder='Дом'
                      required
                    />
                  </div>
                  <div className={styles.form__element}>
                    <p className={styles.form__label}>Квартира</p>
                    <input
                      type='text'
                      className={`${styles.form__input} ${styles.form__input_delivery}`}
                      placeholder='Квартира'
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <p className={styles.form__label}>Дополнительная информация</p>
            <input
              type='text'
              className={`${styles.form__input} ${styles.form__input_info}`}
              placeholder='Дополнительная информация'
            />
            <p className={styles.form__label}>
              Дополнительная информация по оплате
            </p>
            <input
              type='text'
              className={`${styles.form__input} ${styles.form__input_info}`}
              placeholder='Дополнительная информация по оплате'
            />
            <div className={styles.order}>
              <p className={styles.order__title}>Товары</p>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Kosmoteros Personnel</p>
                  <p className={styles.order__name}>SKU0002</p>
                </div>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Количество</p>
                  <p className={styles.order__name}>1</p>
                </div>
                <p className={styles.order__name}>
                  Биостимулирующий дневной крем
                </p>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>100мл</p>
                  <p
                    className={`${styles.order__name} ${styles.order__name_sum}`}
                  >
                    4 567 ₽
                  </p>
                </div>
              </div>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Kosmoteros Personnel</p>
                  <p className={styles.order__name}>SKU0002</p>
                </div>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Количество</p>
                  <p className={styles.order__name}>1</p>
                </div>
                <p className={styles.order__name}>
                  Биостимулирующий дневной крем
                </p>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>100мл</p>
                  <p
                    className={`${styles.order__name} ${styles.order__name_sum}`}
                  >
                    4 567 ₽
                  </p>
                </div>
              </div>
            </div>
            <button
              type='button'
              className={`${styles.popup__button} ${styles.popup__button_edit}`}
            >
              Изменить
            </button>
            <div className={styles.order__sum}>
              <p
                className={`${styles.order__title} ${styles.order__title_sum}`}
              >
                Сумма заказа
              </p>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Товары</p>
                  <p className={styles.order__name}>9 134 ₽</p>
                </div>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Скидка</p>
                  <p className={styles.order__name}>888 ₽</p>
                </div>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>
                    Сумма начисленных бонусов
                  </p>
                  <p className={styles.order__name}>888</p>
                </div>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>Итого</p>
                  <p className={styles.order__name}>{selectedOrder.total} ₽</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PopupWithForm>
  );
}

export default PopupOrders;
