import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from "../utils/api";
import { useForm } from "../hooks/useForm";
import MainContainer from "../components/common/main-container/main-container";
import RequestForm from "../components/common/request-form/request-form";
import ActionString from "../components/common/action-string/action-string";


function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { handleChange, values } = useForm({
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPassword(values)
      .then(() => {
        localStorage.setItem("hasSendPassword", true);
        navigate("/reset-password", { replace: true });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  return (
    <MainContainer extraClass="ps-l">

      <RequestForm title="Восстановление пароля" formName="forgot-password" onSubmit={handleSubmit}>

        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}
        />

        <Button htmlType="submit" type="primary" size="large">Восстановить</Button>
      </RequestForm>

      <ActionString label="Войти" path="/login">Вспомнили пароль?</ActionString>
    </MainContainer>
  );
}

export default ForgotPasswordPage;
