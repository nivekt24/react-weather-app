import { useRef } from 'react';
import { useKey } from '../../hooks/useKey';

const Search = ({ location, setLocation }) => {
  const inputEl = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setLocation('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Enter Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
