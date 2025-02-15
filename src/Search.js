import React from "react";
import "./Search.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Search = ({ searchdata, setSearchData }) => {
  return (
    <div className="search">
      {/* <p>Search Component</p> */}
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          borderColor: "#4597B4",
          color: "white",
        }}
      >
        {/* sx={{ bgcolor: "#337A9E" }} */}
        <TextField
          fullWidth
          placeholder="Search City..."
          id="fullWidth"
          onChange={(e) => setSearchData(e.target.value)}
          autoComplete="off"
          InputProps={{
            style: {
              backgroundColor: "white",
              border: "1px solid white",
            },
          }}
        />
      </Box>
    </div>
  );
};
export default Search;
