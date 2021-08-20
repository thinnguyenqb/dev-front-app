import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const StatusModal = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5>Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            className="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="input_images">
            <i className="fas fa-camera" />
            <div className="file_upload">
              <i className="fas fa-image" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="status_footer mt-3">
          <button className="btn btn-more w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
