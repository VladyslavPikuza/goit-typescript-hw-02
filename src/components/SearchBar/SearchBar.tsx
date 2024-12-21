import { useState } from 'react';
import { toast } from 'react-hot-toast';
import s from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header>
      <form className={s.Form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
