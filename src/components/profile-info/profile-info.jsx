import React from "react";
import styles from "./profile-info.module.css";
import RequestForm from "../request-form/request-form";
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../../hooks/useForm";


function ProfileInfo() {
  // заполнение полей должно происходить из store
  const { handleChange, values, visible, handleVisible, edit, handleEdit } = useForm({
    name: '', email: '', password: ''
  });

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onIconClick = (ref) => {
    ref.current.focus();
  }

  const handleSubmit = () => {

  }

  return (
    <RequestForm formName="profile" onSubmit={handleSubmit} extraClass={styles.profileForm}>

      <Input
        onBlur={() => handleEdit()}
        onFocus={() => handleEdit()}
        type='text'
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        icon={nameRef.current === document.activeElement ? 'CloseIcon' : 'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        ref={nameRef}
        onIconClick={() => onIconClick(nameRef)}
        size={'default'}
      />

      <Input
        onBlur={() => handleEdit()}
        onFocus={() => handleEdit()}
        type='text'
        placeholder={'Логин'}
        onChange={handleChange}
        value={values.email}
        name={'email'}
        icon={emailRef.current === document.activeElement ? 'CloseIcon' : 'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        ref={emailRef}
        onIconClick={() => onIconClick(emailRef)}
        size={'default'}
      />

      <Input
        onBlur={() => handleEdit()}
        onFocus={() => handleEdit()}
        type="password"
        autoComplete='off'
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={passwordRef.current === document.activeElement ? 'CloseIcon' : 'EditIcon'}
        value={values.password}
        name={'password'}
        error={false}
        ref={passwordRef}
        onIconClick={() => onIconClick(passwordRef)}
        errorText={'Ошибка'}
        size={'default'}
      />

      <div className={styles.buttons}>
        <Button htmlType="button" type="secondary" size="large" extraClass="pt-4 pb-4 pl-2 pr-2">Отмена</Button>
        <Button htmlType="submit" type="primary" size="large" extraClass="pt-4 pb-4">Сохранить</Button>
      </div>
    </RequestForm>
  );
}

export default ProfileInfo;
