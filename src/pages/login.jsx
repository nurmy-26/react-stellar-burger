import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import RequestForm from "../components/request-form/request-form";
import ActionString from "../components/action-string/action-string";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";


function LoginPage() {
  const { handleChange, values, visible, handleVisible } = useForm({
    email: '', password: ''
  });

  const handleSubmit = () => {

  }

  return (
    <MainContainer extraClass={styles.marginLarge}>

      <RequestForm title="Вход" formName="entry" onSubmit={handleSubmit}>

        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}
        />

        <Input
          type={visible ? "text" : "password"}
          autoComplete='off'
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={visible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name={'password'}
          error={false}
          onIconClick={handleVisible}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Button htmlType="submit" type="primary" size="large">Войти</Button>
      </RequestForm>

      <ActionString label="Зарегистрироваться" path="/register">Вы&nbsp;&mdash; новый пользователь?</ActionString>
      <ActionString label="Восстановить пароль" path="/forgot-password">Забыли пароль?</ActionString>
    </MainContainer>
  );
}

export default LoginPage;
