import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OpenQuestionState} from "./open-question.types.ts";
import {SessionStatus} from "@/app/types/session.types.ts";
import {getPreviewData, getPrice} from "@/entities/open-question/open-question.actions.ts";

const initialState: OpenQuestionState = {
  file_id: null,
  session_status: null,
  preview: null,
  calculated_price:null,
  loadingPreview:false
};


const openQuestionSlice = createSlice({
  name: 'open-question',
  initialState,
  reducers: {
    setFileId: (state, action: PayloadAction<string | null>) => {
      state.file_id = action.payload;
    },
    setSessionStatus: (state, action: PayloadAction<SessionStatus | null>) => {
      state.session_status = action.payload;
    },
    resetPrice: (state) => {
      state.calculated_price = null
    },
    clearOpenQuestion: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPreviewData.fulfilled, (state, action) => {
        state.preview = action.payload
        state.loadingPreview = false
      })
      .addCase(getPreviewData.pending, (state, action) => {
        state.loadingPreview = true
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.calculated_price = action.payload
      })

  },
});

export const {resetPrice,clearOpenQuestion, setFileId, setSessionStatus} = openQuestionSlice.actions;
export const openQuestionReducer = openQuestionSlice.reducer;