import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import RequestForm from "../components/request-form/request-form";
import ActionString from "../components/action-string/action-string";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";


function RegisterPage() {
  const { handleChange, values, visible, handleVisible } = useForm({
    name: '', email: '', password: ''
  });

  const handleSubmit = () => {

  }

  return (
    <MainContainer extraClass={styles.marginLarge}>

      <RequestForm title="Регистрация" formName="register" onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

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

        <Button htmlType="button" type="primary" size="large">Зарегистрироваться</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Уже зарегистрированы?</ActionString>
    </MainContainer>
  );
}

export default RegisterPage;
