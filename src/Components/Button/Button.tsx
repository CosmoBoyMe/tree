import classNames from 'classnames';
import { MouseEvent, FormEvent, FC } from 'react';

import './Button.scss';

type Props = {
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: FormEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({
  text,
  type = 'button',
  disabled = false,
  onClick,
  onSubmit,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={classNames('button', {
        'button--disabled': disabled,
      })}
    >
      {text}
    </button>
  );
};

export { Button };
