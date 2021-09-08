import React, {useState} from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <div className="card_body">
      <div className="card_body-content" style={{
        filter: theme ? 'invert(1)' : 'invert(0)',
        color: theme ? 'white' : '#111',
      }}>
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
