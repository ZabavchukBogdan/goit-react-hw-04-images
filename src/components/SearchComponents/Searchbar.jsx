import { useState } from 'react';
import { Notify } from 'notiflix';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [textForSearch, setTextForSearch] = useState('');

  // Додавання textForSearch в state при зміні інпута
  const handleTextForSearchChange = event => {
    setTextForSearch(event.currentTarget.value.toLowerCase());
  };

  // Функція при сабміті форми
  const handleSubmit = event => {
    event.preventDefault();

    if (!textForSearch.trim()) {
      Notify.info('Please enter a topic to search for images...', {
        position: 'center-center',
      });

      return;
    }

    // Передаємо SearchBar.state в App.state
    onSubmit(textForSearch.trim());

    // Резетаємо інпут
    setTextForSearch('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          Search
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={textForSearch}
          onChange={handleTextForSearchChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}