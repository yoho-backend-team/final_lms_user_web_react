import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ onSelect }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "45px",
        left: "562px",
        zIndex: "1000",
      }}
    >
      <Picker data={data} onEmojiSelect={onSelect} />
    </div>
  );
};

export default EmojiPicker;
