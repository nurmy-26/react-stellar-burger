import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from "../utils/cookie";
import { useForm } from "../hooks/useForm";
import { login } from "../services/actions/auth";
import { getAuthChecked, getUser } from "../services/selectors/auth";
import MainContainer from "../components/common/main-container/main-container";
import RequestForm from "../components/common/request-form/request-form";
import ActionString from "../components/common/action-string/action-string";


function LoginPage() {
  const user = useSelector(getUser)
  const isAuthChecked = useSelector(getAuthChecked)
  const dispatch = useDispatch();

  const { handleChange, values, visible, toggleIcon } = useForm({
    email: '', password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values))
  }

  // #todo - удалить
  const consolelog = () => {
    console.log(`refreshToken из куков: ${getCookie('refreshToken')}`)
    console.log(`token из куков: ${getCookie('token')}`)
    console.log(user)
    console.log(isAuthChecked)
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
        <Button htmlType="button" type="primary" size="large" onClick={consolelog}>Console</Button>
      </RequestForm>

      <ActionString label="Зарегистрироваться" path="/register">Вы&nbsp;&mdash; новый пользователь?</ActionString>
      <ActionString label="Восстановить пароль" path="/forgot-password">Забыли пароль?</ActionString>
    </MainContainer>
  );
}

export default LoginPage;
