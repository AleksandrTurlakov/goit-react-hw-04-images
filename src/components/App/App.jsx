import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { ReactComponent as MySVG } from '../Svg/icon-bold-arrow-up.svg';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../LoadMore/LoadMore';
import { Loader } from '../Loader/Loader';
import { GlobalStyle } from '../GlobalStyle/GlobalStyle';
import { Container } from './App.styled';

export const App = () => {
  const [imageGallery, setImageGallery] = useState([]);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (imageName === '') return;

    async function getImageGallery() {
      try {
        setIsLoading(true);
        const imageGallery = await getImages(imageName, page);
        setImageGallery(prevImageGallery => [
          ...prevImageGallery,
          ...imageGallery.hits,
        ]);
        setTotalHits(imageGallery.totalHits);
        if (imageGallery.totalHits === 0)
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
      } catch {
        toast.error('Something went wrong, please try again! 🤷‍♂️🤷‍♀️🤷‍♂️');
      } finally {
        setIsLoading(false);
      }
    }
    getImageGallery();
  }, [imageName, page]);

  const addImage = searchImageName => {
    if (imageName.trim() !== searchImageName.trim()) {
      setImageName(searchImageName);
      setPage(1);
      setImageGallery([]);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const totalPage = imageGallery.length / totalHits;
  return (
    <Container>
      <Searchbar onSubmit={addImage} />
      <GlobalStyle />
      <ImageGallery items={imageGallery} />
      {isLoading && <Loader />}
      {imageGallery.length !== 0 && totalPage !== 1 && page < 42 && (
        <LoadMore onClick={loadMore} />
      )}
      <Toaster
        toastOptions={{
          style: {
            background: '#f8c1c1',
            color: '#fff',
            textAlign: 'center',
          },
        }}
      />
      <ScrollToTop smooth component={<MySVG style={{ display: 'flex' }} />} />
    </Container>
  );
};
