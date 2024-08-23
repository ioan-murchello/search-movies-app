import { useState, useEffect, useRef } from 'react';
import useKey from './useKey';

const Search = ({ value, setQuery }) => {
  const [inpValue, setinpValue] = useState(value);
  const inputRef = useRef(null);

  useKey('Enter', () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery('');

  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inpValue);
    }, 900);

    return () => clearTimeout(timer);
  }, [inpValue, setQuery]);

  const handleChange = (e) => {
    setinpValue(e.target.value);
  };
  return (
    <>
      <input
        className='search'
        type='text'
        placeholder='Search movies...'
        value={inpValue}
        onChange={handleChange}
        ref={inputRef}
      />
    </>
  );
};
export default Search;
