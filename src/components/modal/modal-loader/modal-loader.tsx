import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-loader.module.css";
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import pentagonA from "../../../images/pentagon-1.svg"
import pentagonB from "../../../images/pentagon-2.svg"
import pentagonC from "../../../images/pentagon-3.svg"
import { useSelector } from "react-redux";
import { getOrderData } from "../../../services/selectors/order";


type Props = {
  hasError?: boolean;
  errorMessage?: string;
  loadingText?: string;
  size?: 's' | 'm';
  type?: 'common' | 'sendOrder';
}

function ModalLoader({
  hasError=false,
  errorMessage='Что-то пошло не так :(',
  loadingText='Ожидаем данные...',
  size='s',
  type='common'}: Props) {

  const containerClasses = styles.container + ' ' + (size === 'm' ? styles.containerMedium : '')
  const textClasses = styles.status + (hasError ? '' : (' ' + styles.animated));

  const orderInfo = useSelector(getOrderData);

  // обратный отсчет для отправки заказа
  const [countdown, setCountdown] = React.useState(15);
  let countdownInterval: NodeJS.Timeout | string | number | undefined = 0;

  React.useEffect(() => {
    if (type === 'sendOrder') {
      // создаем интервал, который будет уменьшать счетчик каждую секунду
    countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        // если счетчик достиг 0, останавливаем интервал
        if (prevCountdown <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // очищаем интервал при размонтировании компонента
    return () => clearInterval(countdownInterval);
    }
  }, []);

  return (
    <div className={containerClasses}>
      <span className={textClasses}>{hasError ? errorMessage : loadingText}</span>
      <div className={styles.stub}>
        <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonA} alt="фоновый вектор" />
        <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonB} alt="фоновый вектор" />
        <img className={`${styles.penta} ${styles.pentaB}`} src={pentagonC} alt="фоновый вектор" />
      </div>

      {/* обратный отсчет */}
      {type === 'sendOrder' &&
      <>
        <p className={styles.countdown}>
          {`${orderInfo.status}${countdown}`}
        </p>

        <p className={`${styles.substatus} ${styles.countdownSubstatus}`}>
          {orderInfo.substatus}
        </p>
      </>
      }

      {/* доп-текст для ошибки */}
      {hasError &&
          <p className={styles.substatus}>
            <InfoIcon type="secondary" />
            Обратитесь в службу межгалактической поддержки
          </p>
      }
    </div>
  );
}

ModalLoader.propTypes = {
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  loadingText: PropTypes.string
}

export default ModalLoader;
