import { FC, FormEvent, useState } from 'react';

import './NodeForm.scss';
import { Button } from '../Button/Button';

type Props = {
  onSubmit: (text: string) => void;
};

const NodeForm: FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(text);
    setText('');
  };

  return (
    <form className="node-form" onSubmit={handleFormSubmit}>
      <input
        type="textarea"
        className="node-form__input"
        placeholder="add new node"
        onChange={(event) => setText(event.currentTarget.value)}
        value={text}
      />
      <Button text="ADD" type="submit" disabled={text === ''} />
    </form>
  );
};

export { NodeForm };
