import React, { FormEvent, RefObject } from "react";
import styles from "./profile-info.module.css";
import RequestForm from "../../common/request-form/request-form";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "../../../hooks/redux-hooks";
import { getUser } from "../../../services/selectors/auth";
import { updateUser } from "../../../services/slices/auth";


function ProfileInfo() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const initialForm = {
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: ''
  }

  const { handleChange, setValues, toggleIcon, values } = useForm(initialForm);

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onIconClick = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.focus();
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values));
  }

  const handleReset = () => {
    setValues(initialForm);
  }

  return (
    <RequestForm formName="profile" onSubmit={handleSubmit} onReset={handleReset} extraClass={styles.profileForm}>

      <Input
        onBlur={() => toggleIcon()}
        onFocus={() => toggleIcon()}
        type='text'
        autoComplete='name'
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
        onBlur={() => toggleIcon()}
        onFocus={() => toggleIcon()}
        type='text'
        autoComplete='email'
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
        onBlur={() => toggleIcon()}
        onFocus={() => toggleIcon()}
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

      {
      // блок с кнопками отобразится, только если значения полей будут отличаться от исходных
      JSON.stringify(values) !== JSON.stringify(initialForm) &&

      <div className={styles.buttons}>
        <Button htmlType="reset" type="secondary" size="large" extraClass="pt-4 pb-4 pl-2 pr-2">Отмена</Button>
        <Button htmlType="submit" type="primary" size="large" extraClass="pt-4 pb-4">Сохранить</Button>
      </div>
      }

    </RequestForm>
  );
}

export default React.memo(ProfileInfo);
