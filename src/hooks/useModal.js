import React from "react";


// кастомный хук для управления модальным окном
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // `useCallback` нужен чтобы зафиксировать ссылку на функцию и уменьшить кол-во перерисовок компонента, в который будет передана эта функция
  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
