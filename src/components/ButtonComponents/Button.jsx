import { ButtonLoadMore, ButtonContainer } from './Button.styled';

// Кнопка загрузити ще
export function Button({ onClick }) {
  return (
    <ButtonContainer>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load more
      </ButtonLoadMore>
    </ButtonContainer>
  );
}