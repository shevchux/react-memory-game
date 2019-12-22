import React, { useEffect, useState } from 'react';
import { LayoutWrapper } from '../../Components/LayoutWrapper';
import { useGame } from '../../Context/Game/gameContext';
import { Card } from '../../Components/Card';
import { BACK_REVERSE_TIMEOUT } from '../../config';
import './index.scss';
import { formatScore } from '../../helpers/format';

interface GameLayoutProps {
  onFinish(time: number, date: number): void;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ onFinish }) => {
  const [isGameInited, setGameInited] = useState(false);
  const {
    preview,
    cards,
    score,
    cardsLeft,
    openCard,
    replay,
  } = useGame();

  useEffect(() => {
    replay();
    setGameInited(true);
  }, []);

  useEffect(() => {
    if (isGameInited && cardsLeft === 0) {
      setTimeout(onFinish, BACK_REVERSE_TIMEOUT, score, Number(new Date()));
    }
  }, [isGameInited, cardsLeft]);

  const replayWithConfirm = (): void => {
    if (confirm('Вы действительно хотите начать игру заново?')) {
      replay();
    }
  };

  return (
    <LayoutWrapper>
      <div className="game-layout">
        <div className="game-header">
          <button
            type="button"
            disabled={preview}
            className="game-header__replay-button"
            onClick={replayWithConfirm}
          >
            Начать заново
          </button>
          <div className="game-header__score">{formatScore(score)}</div>
        </div>
        <ul className="field">
          {isGameInited && cards.map(({
            id, value, played, opened, error,
          }, index) => (
            <li key={id} className="field__item">
              <Card
                value={value}
                played={played}
                opened={opened}
                error={error}
                onClick={() => openCard(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </LayoutWrapper>
  );
};
