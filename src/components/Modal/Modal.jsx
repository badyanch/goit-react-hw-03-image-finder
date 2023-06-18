import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import * as S from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImgUrl: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImgUrl, descr } = this.props;

    return createPortal(
      <S.Overlay onClick={this.handleBackdropClick}>
        <S.Content>
          <S.Image src={largeImgUrl} alt={descr} />
        </S.Content>
      </S.Overlay>,
      modalRoot
    );
  }
}
