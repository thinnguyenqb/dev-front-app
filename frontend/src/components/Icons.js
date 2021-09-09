import React from "react";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import { RiUserSmileLine } from "react-icons/ri";

const Icons = ({ setContent, content, theme }) => {
  //const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setContent(content + emojiObject.emoji);
  };

  return (
    <div className="nav-item dropdown" style={{ zIndex: "100", opacity: 1, filter: theme ? "invert(1)" : "invert(0)" }}>
      <span className="nav-link position-relative"
        id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
      >
        <span style={{ fontSize: "2rem"}}>
          <RiUserSmileLine />
        </span>
      </span>
      
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_NEUTRAL}
          groupNames={{ smileys_people: "PEOPLE" }}
          disableSkinTonePicker={true}
          />     
      </div>
    </div>
  );
};

export default Icons;
