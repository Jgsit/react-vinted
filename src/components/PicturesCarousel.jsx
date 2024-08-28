import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

function PicturesCarousel(props) {
  const { data } = props;

  return (
    <Carousel responsive={responsive} draggable={false}>
      {data.map((image, index) => {
        return (
          <div className="slider" key={index}>
            <img src={image.secure_url} />
          </div>
        );
      })}
    </Carousel>
  );
}

export default PicturesCarousel;
