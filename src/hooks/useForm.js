import React from "react";


// кастомный хук для управления значениями инпутов формы (принимает объект с начальными значениями полей)
export const useForm = (inputValues={}) => {
  const [values, setValues] = React.useState(inputValues);
  const [visible, setVisible] = React.useState(true);

  const handleChange = React.useCallback((e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }, []);

  // смена иконки между двумя вариантами
  const toggleIcon = React.useCallback(() => {
    setVisible(!visible)
  }, []);

  return {
    handleChange,
    values,
    setValues,
    visible,
    toggleIcon
  };
};
