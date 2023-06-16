import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { getPictures } from 'services/api';
import { SearchBar } from './SearchComponents/Searchbar'
import { ImageGallery } from './ImageGalleryComponents/ImageGallery';
import { Button } from './ButtonComponents/Button'
import { Loader } from './LoaderComponents/Loader';
import { Modal } from './ModalComponents/Modal';
import { AppContainer} from './App.styled';

export function App() {
  const [textForSearch, setTextForSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [modalImgURL, setModalImgURL] = useState('');
  const [tagsImg, setTagsImg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);

  const per_page = 12;

  // useEffect === fetch при зміні [textForSearch, page, per_page]
  useEffect(() => {
    // при пустому textForSearch - виходимо
    if (textForSearch === '') {
      return;
    }

    setStatus('pending');

    //Fetch
    getPictures(textForSearch, page, per_page)
      .then(elements => {
        if (elements.hits.length === 0) {
          setStatus('idle');
          return Notify.failure('Sorry images not found...', {
            position: 'center-center',
          });
        }

        setPictures(prevPicture => [...prevPicture, ...elements.hits]);
        setTotalPages(Math.ceil(elements.totalHits / per_page));
        setStatus('idle');
      })
      .catch(error => {
        setError(true);
        console.log(error);
      });
  }, [textForSearch, page, per_page]);

  //Приймаємо та оновлюємо данні в this.state
  const handleFormSubmit = textForSearch => {
    setTextForSearch(textForSearch);
    setPage(1);
    setPictures([]);
  };

  //Додаємо сторінку
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //Функія по кліку на картинку, для запису data в state та відкриття модалки
  const getImgData = (modalImgURL, tagsImg) => {
    setModalImgURL(modalImgURL);
    setTagsImg(tagsImg);
    toggleModal();
  };

  // Закриття модалки
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={handleFormSubmit} />


      {pictures.length > 0 && !error && (
        <ImageGallery pictures={pictures} onClick={getImgData} />
      )}

      {status === 'pending' && !error && <Loader />}

      {pictures.length > 0 && totalPages !== page && !error && (
        <Button onClick={handleLoadMore} />
      )}

      {modalVisible && (
        <Modal
          modalImgURL={modalImgURL}
          tagsImg={tagsImg}
          onClose={toggleModal}
        />
      )}
    </AppContainer>
  );
}






