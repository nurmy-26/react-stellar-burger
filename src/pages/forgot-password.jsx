import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import RequestForm from "../components/request-form/request-form";
import ActionString from "../components/action-string/action-string";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";


function ForgotPasswordPage() {
  const { handleChange, values, visible, handleVisible } = useForm({
    code: '', password: ''
  });

  const handleSubmit = () => {

  }

  return (
    <MainContainer extraClass={styles.marginLarge}>

      <RequestForm title="Восстановление пароля" formName="reset-password" onSubmit={handleSubmit}>

        <Input
          type={visible ? "text" : "password"}
          autoComplete='off'
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          icon={visible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name={'password'}
          error={false}
          onIconClick={handleVisible}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.code}
          name={'code'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Button htmlType="button" type="primary" size="large">Сохранить</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Вспомнили пароль?</ActionString>
    </MainContainer>
  );
}

export default ForgotPasswordPage;
