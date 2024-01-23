import { useState } from "react";

export default function MyCarousel() {
  const [activeImage, setActiveImage] = useState(1);

  const [imgList, setImgList] = useState([
    {
      src: "https://i.pinimg.com/564x/06/23/32/062332d3b08dbd311204fb68692765ec.jpg",
    },
    {
      src: "https://i.pinimg.com/564x/4f/64/66/4f646676903c73b3d6df85d8bf8ad719.jpg",
    },
    {
      src: "https://i.pinimg.com/564x/2a/e7/35/2ae735e06106522f13983566e5fab1b3.jpg",
    },
  ]);

  return (
    <div>
      <div className="carousel__slides">
        <ul>
          {imgList.map((item, index) => (
            <div key={`carousel_${index}}`}>
              <input
                type="radio"
                id={`img-${index + 1}`}
                checked={activeImage === index + 1}
                readOnly
              />
              <li className="carousel__slide-container" key={`img_${index}`}>
                <div className="carousel__slide-img">
                  <img src={item.src} />
                </div>
                <div className="carousel__controls">
                  <label
                    onClick={() => {
                      setActiveImage(index + 1 === 1 ? imgList.length : index);
                    }}
                    className="carousel__slide-prev"
                  >
                    <span>&lsaquo;</span>
                  </label>
                  <label
                    onClick={() => {
                      setActiveImage(
                        index + 1 === imgList.length ? 1 : index + 2
                      );
                    }}
                    className="carousel__slide-next"
                  >
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
