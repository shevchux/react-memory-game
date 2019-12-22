import React from 'react';
import { LayoutWrapper } from '../../Components/LayoutWrapper';
import { GamePoster } from '../../Components/GamePoster';
import { Button } from '../../Components/Button';
import './styles.scss';
import { useRating } from '../../Context/Rating/RatingContext';
import { formatScore } from '../../helpers/format';

interface ResultLayoutProps {
  onRetry(): void;
}

export const ResultLayout: React.FC<ResultLayoutProps> = ({ onRetry }) => {
  const { me } = useRating();

  return (
    <LayoutWrapper withRating>
      <div className="result-layout">
        <GamePoster title="Игра завершена" />
        <div className="result-layout__string">
          {`Ваш результат: ${formatScore(me.lastScore)}`}
          <br />
          {`Лучшая попытка: ${formatScore(me.bestScore)} (место #${me.bestPlace + 1})`}
        </div>
        <Button type="button" onClick={onRetry}>Еще раз</Button>
      </div>
    </LayoutWrapper>
  );
};
