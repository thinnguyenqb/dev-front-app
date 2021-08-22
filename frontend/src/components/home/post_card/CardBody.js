import React, {useState} from "react";
import Carousel from "../../Carousel";
import { useSelector } from "react-redux";

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false)

  const { theme } = useSelector(state => state)
  return (
    <div className="card_body">
      <div className="card_body-content">
        <span>
          {
            post.content.length < 160
            ? post.content
            : readMore ? post.content + ' ': post.content.slice(0, 160) + '...   '
          }
        </span>
        {
          post.content.length > 160 &&
          <span className="readMore" onClick={() => setReadMore(!readMore)}
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          >
            {readMore ? 'Hide content': 'Read more'}
          </span>
        }

      </div>
      {
        post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
