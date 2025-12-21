import clsx from 'clsx';
import * as React from 'react';
import s from './Footer.module.scss';
import { Typography } from 'components/common';
import MapIcon from 'assets/icons/map.svg?react';
import PhoneIcon from 'assets/icons/phone.svg?react';
import MessageIcon from 'assets/icons/message.svg?react';

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
              <MapIcon />
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
              <PhoneIcon />
              <a href="tel:+7XXXXXXXXXX" className={s.item__link}>
                +7 (XXX) XXX-XX-XX
              </a>
            </div>
          </li>
          <li>
            <div className={s.has__icon}>
              <MessageIcon />
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
