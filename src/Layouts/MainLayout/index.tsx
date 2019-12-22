import React from 'react';
import { NameForm } from '../../Components/NameForm';
import { LayoutWrapper } from '../../Components/LayoutWrapper';
import { GamePoster } from '../../Components/GamePoster';
import './styles.scss';

interface MainLayoutProps {
  onStart(name: string): void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ onStart }) => {
  const onSubmitHandler = (inputName: string): void => {
    if (!inputName) {
      alert('Имя не может быть пустым');
    } else {
      onStart(inputName);
    }
  };

  return (
    <LayoutWrapper withRating>
      <div className="main-layout">
        <GamePoster title="React Memory Game" />
        <NameForm onSubmit={onSubmitHandler} />
      </div>
    </LayoutWrapper>
  );
};
