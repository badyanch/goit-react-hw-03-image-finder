import PropTypes from 'prop-types';
import * as S from './Button.styled';

export const Button = ({ onLoadMore }) => (
  <S.LoadMoreBtn type="button" onClick={onLoadMore}>
    Load more
  </S.LoadMoreBtn>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
