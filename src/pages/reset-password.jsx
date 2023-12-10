import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import RequestForm from "../components/request-form/request-form";
import ActionString from "../components/action-string/action-string";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";


function ResetPasswordPage() {
  const { handleChange, values } = useForm({
    email: ''
  });

  const handleSubmit = () => {

  }

  return (
    <MainContainer extraClass={styles.marginLarge}>

      <RequestForm title="Восстановление пароля" formName="reset-password" onSubmit={handleSubmit}>

        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}
        />

        <Button htmlType="button" type="primary" size="large">Восстановить</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Вспомнили пароль?</ActionString>
    </MainContainer>
  );
}

export default ResetPasswordPage;
