import { Component, createRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GlobalStyle } from 'components/GlobalStyle';
import * as imgsAPI from 'services';
import { Searchbar } from 'components/Searchbar';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import * as S from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    total: 0,
  };

  galleryRef = createRef();

  getSnapshotBeforeUpdate(_, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const gallery = this.galleryRef.current;

      return gallery.scrollHeight - gallery.scrollTop;
    }

    return null;
  }

  componentDidUpdate(_, prevState, snapshot) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (snapshot !== null) {
      window.scrollTo({ top: snapshot, behavior: 'smooth' });
    }

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      this.fetchImgs();
    }
  }

  handleSubmitForm = searchQuery => {
    const isValid = this.validationSearchQuery(searchQuery);

    if (isValid) {
      this.setState({
        searchQuery,
        currentPage: 1,
        images: [],
        total: 0,
      });
    }
  };

  handleLoadMore = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  async fetchImgs() {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await imgsAPI.getImgs(options);

      const newImages = hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );

      if (currentPage === 1) {
        if (!newImages.length) {
          toast.error(`No results found for ${searchQuery}`);
          return;
        }

        this.setState({ images: newImages, total: totalHits });
      } else {
        this.setState(({ images }) => ({
          images: [...images, ...newImages],
        }));
      }

      this.checkIsAllCollection({
        currentPage,
        total: totalHits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  validationSearchQuery(newSearchQuery) {
    if (newSearchQuery === this.state.searchQuery) {
      toast.info(
        `Request for ${newSearchQuery} already processed. Enter new value.`
      );

      return false;
    }

    return true;
  }

  checkIsAllCollection({ currentPage, total }) {
    const lastPage = Math.ceil(total / 12);

    if (currentPage === lastPage) {
      toast.success(
        `You have uploaded all images for request ${this.state.searchQuery}`
      );
    }
  }

  render() {
    const { images, isLoading, total } = this.state;
    const isVisibleBtn =
      !isLoading && images.length !== 0 && images.length < total;

    return (
      <S.Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleSubmitForm} isDisabledBtn={isLoading} />
        <ImageGallery ref={this.galleryRef} images={images} />
        {isVisibleBtn && <Button onLoadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={5000} />
      </S.Container>
    );
  }
}
