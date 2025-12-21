import clsx from 'clsx';
import * as React from 'react';
import s from './Footer.module.scss';
import { Typography } from 'components/common';

type FooterProps = {
  className?: string;
};

const Footer = ({ className }: FooterProps): React.ReactElement => {
  return (
    <footer className={clsx(s.footer, s.container, className)}>
      <div className={s.column}>
        <Typography tag="h2" variant="sub-heading" className={s.column__header}>
          Покупателям
        </Typography>
        <ul className={s.column__items}>
          <li>
            <a href="#" className={s.item__link}>
              Каталог
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Распродажа
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Новинки
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Хиты продаж
            </a>
          </li>
        </ul>
      </div>
      <div className={s.column}>
        <Typography tag="h2" variant="sub-heading" className={s.column__header}>
          Помощь
        </Typography>
        <ul className={s.column__items}>
          <li>
            <a href="#" className={s.item__link}>
              Оформление заказа
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Доставка и оплата
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Возврат и обмен
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Конфиденциальность <br /> и защита информации
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Договор оферты
            </a>
          </li>
        </ul>
      </div>
      <div className={s.column}>
        <Typography tag="h2" variant="sub-heading" className={s.column__header}>
          О компании
        </Typography>
        <ul className={s.column__items}>
          <li>
            <a href="#" className={s.item__link}>
              О нас
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Блог
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Контакты
            </a>
          </li>
          <li>
            <a href="#" className={s.item__link}>
              Вакансии
            </a>
          </li>
        </ul>
      </div>
      <div className={s.column}>
        <Typography tag="h2" variant="sub-heading" className={s.column__header}>
          Наш адрес
        </Typography>
        <ul className={s.column__items}>
          <li>
            <div className={clsx(s.has__icon, s.address)}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3.9375C17.5608 3.9375 14.2624 5.30371 11.8306 7.73559C9.39869 10.1675 8.03247 13.4658 8.03247 16.905V17.85C8.55747 24.955 14.455 30.6688 21 38.0625C27.8337 30.345 33.9675 24.5 33.9675 16.905C33.9675 13.4658 32.6013 10.1675 30.1694 7.73559C27.7375 5.30371 24.4392 3.9375 21 3.9375ZM21 10.675C22.2343 10.675 23.4408 11.0411 24.4669 11.727C25.4931 12.4129 26.2927 13.3878 26.7647 14.5283C27.2366 15.6688 27.3596 16.9237 27.1182 18.1341C26.8768 19.3445 26.2817 20.4562 25.4083 21.3283C24.535 22.2005 23.4225 22.794 22.2117 23.0337C21.0009 23.2734 19.7463 23.1486 18.6064 22.6751C17.4666 22.2016 16.4929 21.4006 15.8084 20.3734C15.1239 19.3463 14.7595 18.1393 14.7612 16.905C14.7635 15.2519 15.4219 13.6673 16.5916 12.4992C17.7613 11.3311 19.3469 10.675 21 10.675Z"
                  stroke="#1A1A1A"
                  stroke-width="2.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a href="https://yandex.ru/maps/-/CLDCZ8KW" className={s.item__link}>
                г. Москва,
                <br />
                ул. Примерная, д. 10
              </a>
            </div>
          </li>
        </ul>
        <Typography tag="h2" variant="sub-heading" className={s.column__header}>
          Контакты
        </Typography>
        <ul className={s.column__items}>
          <li>
            <div className={s.has__icon}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.9874 23.9874L35.6217 28.6217C36.2448 29.2448 36.2448 30.2552 35.6217 30.8783C32.2525 34.2475 26.9187 34.6265 23.107 31.7677L20.35 29.7C17.2988 27.4116 14.5884 24.7012 12.3 21.65L10.2323 18.893C7.37346 15.0813 7.75252 9.74748 11.1217 6.37835C11.7448 5.75518 12.7552 5.75518 13.3783 6.37834L18.0126 11.0126C18.696 11.696 18.696 12.804 18.0126 13.4874L16.2256 15.2744C15.9416 15.5584 15.8712 15.9923 16.0508 16.3515C18.1274 20.5048 21.4952 23.8726 25.6485 25.9492C26.0077 26.1288 26.4416 26.0584 26.7256 25.7744L28.5126 23.9874C29.196 23.304 30.304 23.304 30.9874 23.9874Z"
                  stroke="#1A1A1A"
                  stroke-width="2.67"
                />
              </svg>
              <a href="tel:+7XXXXXXXXXX" className={s.item__link}>
                +7 (XXX) XXX-XX-XX
              </a>
            </div>
          </li>
          <li>
            <div className={s.has__icon}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7"
                  y="10.5"
                  width="28"
                  height="21"
                  rx="3.5"
                  stroke="#1A1A1A"
                  stroke-width="2.67"
                />
                <path
                  d="M7 15.75L19.4348 21.9674C20.4201 22.46 21.5799 22.46 22.5652 21.9674L35 15.75"
                  stroke="#1A1A1A"
                  stroke-width="2.67"
                />
              </svg>
              <a href="mailto:hello@hfurniture.ru" className={s.item__link}>
                hello@hfurniture.ru
              </a>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
