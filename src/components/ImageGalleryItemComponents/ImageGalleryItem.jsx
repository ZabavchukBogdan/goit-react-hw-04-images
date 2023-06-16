import { ListItem, Image } from './ImageGalleryItem.styled';


// Картки в галереї
export function ImageGalleryItem({ picture, onImgClick }) {
  return (
    <ListItem>
      <Image
        //викликаємо функцію App.getImgData з необхідними data
        onClick={() => {
          onImgClick(picture.largeImageURL, picture.tags);
        }}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </ListItem>
  );
}