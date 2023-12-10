import React from "react";
import styles from "./profile-history.module.css";
import RequestForm from "../request-form/request-form";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../../hooks/useForm";


function ProfileHistory() {
  // const content = (список заказов).map(item => ( <Карточка заказа /> ))

  return (
    <div className={styles.container}>
      {/* {content} */}
    </div>
  );
}

export default ProfileHistory;
