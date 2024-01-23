import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";
import { register } from "../services/actions/auth";
import MainContainer from "../components/common/main-container/main-container";
import RequestForm from "../components/common/request-form/request-form";
import ActionString from "../components/common/action-string/action-string";


function RegisterPage() {
  const dispatch = useDispatch();

  const { handleChange, values, visible, toggleIcon } = useForm({
    name: '', email: '', password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(values));
  }

  return (
    <MainContainer extraClass="ps-l">

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

        <Button htmlType="submit" type="primary" size="large">Зарегистрироваться</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Уже зарегистрированы?</ActionString>
    </MainContainer>
  );
}

export default RegisterPage;
