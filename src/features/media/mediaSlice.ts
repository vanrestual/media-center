import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListObjectsOutput } from "@aws-sdk/client-s3";
import { RootState, AppThunk } from "../../app/store";
import { getListAllFiles } from "./mediaAPI";

export interface MediaState {
  files: File[];
  listFiles: ListObjectsOutput;
}

const initialState: MediaState = {
  files: [],
  listFiles: {},
};

export const ListAllFiles = createAsyncThunk("media/getListAllFiles", async (amount: number) => {
  const response = await getListAllFiles(amount);
  return response;
});

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addFileToUpload: (state, action: PayloadAction<File>) => {
      // console.log(state.files, action.payload)
      state.files.concat(action.payload);
    },
    removeFileToUpload: (state, action: PayloadAction<File>) => {
      console.log(state, action);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = "failed";
  //     });
  // },
});

export const { addFileToUpload, removeFileToUpload } = mediaSlice.actions;

export const selectFiles = (state: RootState) => state.media.files;
export const selectListFiles = (state: RootState) => state.media.listFiles;

export default mediaSlice.reducer;
