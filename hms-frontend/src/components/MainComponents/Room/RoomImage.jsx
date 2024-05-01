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
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDI%3D",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbnxlbnwwfHwwfHx8Mg%3D%3D",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1556037843-347ddff9f4b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGNoZW58ZW58MHx8MHx8fDI%3D",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENoYWlyfGVufDB8fDB8fHwy",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFwdG9wfGVufDB8fDB8fHwy",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1558827052-620cb6371c78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvb3J8ZW58MHx8MHx8fDI%3D",
    title: "Doors",
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
