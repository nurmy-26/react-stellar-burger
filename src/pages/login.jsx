import React from "react";
import { useDispatch } from "react-redux";
import styles from "./page.module.css";
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";
import { login } from "../services/actions/auth";
import MainContainer from "../components/common/main-container/main-container";
import RequestForm from "../components/common/request-form/request-form";
import ActionString from "../components/common/action-string/action-string";


function LoginPage() {
  const dispatch = useDispatch();

  const { handleChange, values, visible, toggleIcon } = useForm({
    email: '', password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values))
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

        <PasswordInput
          type={visible ? "text" : "password"}
          autoComplete='off'
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={visible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name={'password'}
          error={false}
          onIconClick={toggleIcon}
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
