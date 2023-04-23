import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import Post from "./Post";
import Loader from "../../common/components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./blogSlice";
import SortBy from "../../common/components/SortBy";
import MessageToast from "../../common/components/MessageToast";
import { BLOG_ADD_POST, HOME } from "../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { where } from "firebase/firestore";
import { useTrigram } from "../../hooks/useTrigram";
import { usePagination } from "../../hooks/usePagination";
import LoadMoreButton from "../../common/components/LoadMoreButton";

const Posts = () => {
  const state = useSelector((state) => state);
  const { posts, isPending } = state.blog;
  const { data: likes } = state.like;
  const { data: views } = state.view;

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSortBy, setselectedSortBy] = useState("timestamp");
  const sortBy = [
    { value: "timestamp", descr: "Newest" },
    { value: "oldest", descr: "Oldest" },
    { value: "views", descr: "Views" },
    { value: "likes", descr: "Likes" },
  ];

  const postCount = !isPending && posts.length;
  const dispatch = useDispatch();
  const triGram = useTrigram();
  const [pageSize, increasePageSize, resetPageSize] = usePagination();
  const [searchTerm, setSearchTerm] = useState();
  useEffect(() => {
    dispatch(getPosts({ views: views, likes: likes }));
  }, []);

  const handleSearch = () => {
    const searchConstraints = [];
    resetPageSize();
    const searchText = searchTerm?.replace(/\s/g, "");

    if (searchText?.length >= 3) {
      const searchObj = triGram(searchText);

      for (const prop in searchObj) {
        searchConstraints.push(where(`_smeta.${prop}`, "==", true));
      }
      dispatch(
        getPosts({
          sConstraints: searchConstraints,
          sortBy: selectedSortBy,
          views: views,
          likes: likes,
        })
      );
    } else {
      dispatch(getPosts({ views: views, likes: likes }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <MessageToast></MessageToast>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 4 }}
          >
            <TextField
              placeholder="Search posts"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              value={searchTerm}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              sx={{
                width: { md: 400 },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate(BLOG_ADD_POST, {
                  state: { from: location.pathname },
                });
              }}
            >
              Write Blog Post
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="subtitle1">{postCount} Posts</Typography>
            <SortBy
              list={sortBy}
              selectedValue={selectedSortBy}
              setSelectedValue={setselectedSortBy}
            ></SortBy>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Loader isPending={isPending}></Loader>

          {!isPending &&
            posts?.slice(0, pageSize)?.map((post, index) => {
              return <Post key={post.id} index={index} post={post}></Post>;
            })}

          {!isPending && pageSize < posts?.length && (
            <LoadMoreButton
              increasePageSize={increasePageSize}
            ></LoadMoreButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
