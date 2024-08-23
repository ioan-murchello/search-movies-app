import { useState } from 'react';

const Box = ({ children, title }) => {
  const [isOpen, setisOpen] = useState(true);

  


  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setisOpen((open) => !open)}
      >
        {isOpen ? '–' : '+'}
      </button>
      {!isOpen && <p>{title}</p>}
      {isOpen && children }
    </div>
  );
};
export default Box;
