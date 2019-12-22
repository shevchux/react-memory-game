import React from 'react';
import { Rating } from '../../Components/Rating';
import './styles.scss';

interface LayoutWrapperProps {
  withRating?: boolean
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ withRating = false, children }) => (
  <div className="half-page">
    <div className="half-page__main">
      <div className="half-page__main-content">
        {children}
      </div>
      {withRating && <div className="half-page__rest-hint">🠟 Рейтинг</div>}
    </div>
    {withRating && (
      <div className="half-page__rest">
        <Rating />
      </div>
    )}
  </div>
);
