import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import useFirestore from "../../feature/useFirestore";
import Options from "./Options";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const { documents } = useFirestore("gallery");
  const [photoIndex, setphotoIndex] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(documents);
  return (
    <React.Fragment>
      <ImageList variant="quilted" cols={4} rowHeight={200}>
        {documents.map((item, index) => (
          <ImageListItem
            key={item?.id}
            cols={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            }
            rows={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows
            }
            sx={{
              opacity: "0.7",
              transition: "opacity 0.3s linear",
              cursor: "pointer",
              "&:hover": { opacity: 1 },
            }}
          >
            <Options
              imageId={item?.id}
              uid={item?.data?.uid}
              imageURL={item.data.imageURL}
            />
            <img
              {...srcset(
                item?.data?.imageURL,
                200,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              )}
              alt={item?.data?.uName || item?.data?.uEmail}
              loading="lazy"
              onClick={() => {
                setphotoIndex(index);
                setIsOpen(true);
              }}
            />
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                color: "rgb(255,255,255)",
                backgroundColor: "rgba(0,0,0,0.3)",
                p: "5px",
                borderTopRightRadius: 8,
              }}
            >
              {moment(item?.data?.timestamp?.toDate()).fromNow()}
            </Typography>
            <Tooltip
              title={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
              sx={{ position: "absolute", bottom: "3px", right: "3px" }}
            >
              <Avatar
                src={item?.data?.uPhoto}
                imgProps={{ "aria-hidden": true }}
              />
            </Tooltip>
          </ImageListItem>
        ))}
      </ImageList>
      {isOpen && (
        <Lightbox
          mainSrc={documents[photoIndex]?.data?.imageURL}
          onImageLoad={() => {
            window.dispatchEvent(new Event("resize"));
          }}
          nextSrc={
            documents[(photoIndex + 1) % documents.length]?.data?.imageURL
          }
          prevSrc={
            documents[(photoIndex + documents.length - 1) % documents.length]
              ?.data?.imageURL
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setphotoIndex(
              (photoIndex + documents.length - 1) % documents.length
            )
          }
          onMoveNextRequest={() =>
            setphotoIndex((photoIndex + 1) % documents.length)
          }
          imageTitle={documents[photoIndex]?.data?.uName}
          imageCaption={documents[photoIndex]?.data?.uEmail}
        />
      )}
    </React.Fragment>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const pattern = [
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 2 },
  { rows: 1, cols: 2 },
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
];
