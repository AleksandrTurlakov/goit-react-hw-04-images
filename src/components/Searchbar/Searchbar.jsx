import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import {
  HeaderForm,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleimageNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Enter text in the search bar! 👀');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <HeaderForm>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleimageNameChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
      <Toaster />
    </HeaderForm>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
