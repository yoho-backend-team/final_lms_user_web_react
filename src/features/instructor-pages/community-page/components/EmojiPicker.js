import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ onSelect, handleEmojiClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "176px",
        left: "562px",
        zIndex: "1000",
        cursor: "pointer",
      
      }}
      onClick={handleEmojiClick}
    >
      <Picker data={data} onEmojiSelect={onSelect} />
    </div>
  );
};

export default EmojiPicker;
