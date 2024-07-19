import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const getYouTubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  return `https://img.youtube.com/vi/${ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId}/0.jpg`;
};

const getVimeoThumbnail = async (url) => {
  const videoId = url.split("/").pop();
  const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
  const data = await response.json();
  return data[0].thumbnail_large;
};

const VideoCard = ({ url }) => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = React.useState("");

  React.useEffect(() => {
    const fetchThumbnail = async () => {
      if (url.includes("youtube.com")) {
        setThumbnail(getYouTubeThumbnail(url));
      } else if (url.includes("vimeo.com")) {
        const vimeoThumbnail = await getVimeoThumbnail(url);
        setThumbnail(vimeoThumbnail);
      } else {
        setThumbnail(""); 
      }
    };
    fetchThumbnail();
  }, [url]);

  const handleCardClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="140"
        image={thumbnail || "default_thumbnail.jpg"}
      />
    </Card>
  );
};

export default VideoCard;
