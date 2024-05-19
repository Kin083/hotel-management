import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const imageData = [
  {
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8Mg%3D%3D",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bath Room",
  },
  {
    img: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDI%3D",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1586309183556-562a7c0ada4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGtpdGNoZW58ZW58MHwxfDB8fHww",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1556037843-347ddff9f4b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGNoZW58ZW58MHx8MHx8fDI%3D",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1622653533660-a1538fe8424c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Study Rooms",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1674815329379-3c96932d89b2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1558827052-620cb6371c78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvb3J8ZW58MHx8MHx8fDI%3D",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1600684388091-627109f3cd60?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kitchen",
  },
];

function RoomImage() {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8}>
        {imageData.map((image) => (
          <ImageListItem key={image.img}>
            <img
              srcSet={`${image.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.img}?w=248&fit=crop&auto=format`}
              alt={image.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={image.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default RoomImage;
