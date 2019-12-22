import React, { useState } from 'react';
import { MainLayout } from '../../Layouts/MainLayout';
import { GameLayout } from '../../Layouts/GameLayout';
import { ResultLayout } from '../../Layouts/ResultLayout';
import { useRating } from '../../Context/Rating/RatingContext';
import './styles.scss';

enum MemoryLayout {
  MAIN,
  GAME,
  RESULT
}

export const App: React.FC = () => {
  const { placeInRating, initPlayer } = useRating();
  const [layoutId, setLayoutId] = useState<MemoryLayout>(MemoryLayout.MAIN);

  const onStartHandler = (name: string): void => {
    initPlayer(name);
    setLayoutId(MemoryLayout.GAME);
  };

  const onFinishHandler = (score: number, time: number): void => {
    placeInRating(score, time);
    setLayoutId(MemoryLayout.RESULT);
  };

  const onRetryHandler = (): void => {
    setLayoutId(MemoryLayout.GAME);
  };

  return (
    <div className="wrapper">
      <div className="wrapper__content">
        {layoutId === MemoryLayout.MAIN && (
          <MainLayout onStart={onStartHandler} />
        )}
        {layoutId === MemoryLayout.GAME && (
          <GameLayout onFinish={onFinishHandler} />
        )}
        {layoutId === MemoryLayout.RESULT && (
          <ResultLayout onRetry={onRetryHandler} />
        )}
      </div>
    </div>
  );
};
