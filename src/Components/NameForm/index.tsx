import React, { useRef } from 'react';
import { Button } from '../Button';
import './styles.scss';

interface NameFormProps {
  onSubmit(name: string): void;
}

export const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const nameInput = useRef<HTMLInputElement>();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(nameInput.current.value);
  };

  return (
    <form onSubmit={onSubmitHandler} className="name-form">
      <label htmlFor="playerNameInput" className="name-form__row">
        <span className="name-form__key">Введите ваш ник</span>
        <input
          type="text"
          name="name"
          id="playerNameInput"
          className="name-form__input"
          defaultValue="Player01"
          autoComplete="off"
          autoFocus
          ref={nameInput}
        />
      </label>
      <Button type="submit" className="name-form__button">Старт</Button>
    </form>
  );
};
