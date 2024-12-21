import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';

const API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'ELB_oMOfS2o8VYM66_VxFPiv4y8vHGVAMBhMY8MIvSw';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: ACCESS_KEY,
          },
        });

        setImages((prev) => [...prev, ...response.data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) {
      toast.error('You are already viewing results for this query!');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (imageSrc) => {
    if (modalImage !== imageSrc) {
      setModalImage(imageSrc);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal 
          isOpen={!!modalImage} 
          onRequestClose={() => setModalImage(null)} 
          imageSrc={modalImage} 
        />
      )}
    </div>
  );
};

export default App;


