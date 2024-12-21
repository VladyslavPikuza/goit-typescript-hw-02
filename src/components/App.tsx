import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery, { ImageData } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';

const API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'ELB_oMOfS2o8VYM66_VxFPiv4y8vHGVAMBhMY8MIvSw';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<{ results: ImageData[] }>(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: ACCESS_KEY,
          },
        });
        setImages((prev) => [...prev, ...response.data.results]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) {
      toast.error('You are already viewing results for this query!');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (imageSrc: string) => {
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

