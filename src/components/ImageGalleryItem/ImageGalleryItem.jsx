import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import * as S from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    descr: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    largeImgURL: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { descr, imgUrl, largeImgURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <S.Item>
        <S.Image src={imgUrl} alt={descr} onClick={this.showModal} />
        {isModalOpen && (
          <Modal
            largeImgUrl={largeImgURL}
            descr={descr}
            onCloseModal={this.closeModal}
          />
        )}
      </S.Item>
    );
  }
}
