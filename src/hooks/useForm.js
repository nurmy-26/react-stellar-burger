import React from "react";


// кастомный хук для управления значениями инпутов формы (принимает объект с начальными значениями полей)
export const useForm = (inputValues={}) => {
  const [values, setValues] = React.useState(inputValues);
  const [visible, setVisible] = React.useState(true);
  const [edit, setEdit] = React.useState(true);

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  return {
    handleChange,
    values,
    setValues,
    visible,
    handleVisible,
    edit,
    handleEdit
  };
};
