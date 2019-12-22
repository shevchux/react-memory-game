import React from 'react';
import './style.scss';

const classNames = require('classnames');

interface ButtonProps {
  onSubmit(name: string): void;
}

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, className, ...buttonProps } = props;

  return (
    <button type="submit" className={classNames(className, 'button')} {...buttonProps}>
      {children}
    </button>
  );
};
