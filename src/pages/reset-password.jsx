import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MainContainer from "../components/common/main-container/main-container";
import RequestForm from "../components/common/request-form/request-form";
import ActionString from "../components/common/action-string/action-string";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../hooks/useForm";
import { updatePassword } from "../utils/api";


function ResetPasswordPage() {
  const navigate = useNavigate();
  const hasSendPassword = localStorage.getItem("hasSendPassword")

  const { handleChange, values, visible, toggleIcon } = useForm({
    token: '', password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePassword(values)
      .then(() => {
        localStorage.removeItem("hasSendPassword");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  // на страницу пустит только при наличии переменной в localStorage, записанной на предыдущем роуте
  return hasSendPassword ?
    (<MainContainer extraClass="ps-l">

      <RequestForm title="Восстановление пароля" formName="reset-password" onSubmit={handleSubmit}>

        <PasswordInput
          type={visible ? "text" : "password"}
          autoComplete='off'
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          icon={visible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name={'password'}
          error={false}
          onIconClick={toggleIcon}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Вспомнили пароль?</ActionString>
    </MainContainer>)
    :
    (<Navigate to="/login" />)
}

export default ResetPasswordPage;
