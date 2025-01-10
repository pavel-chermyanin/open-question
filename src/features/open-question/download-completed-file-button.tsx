import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch} from "@/app/store.ts";
import {downloadFinishFile, selectFileId} from "@/entities/open-question";
import {Button} from "rsuite";

export const DownloadCompletedFileButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const file_id = useSelector(selectFileId);

  const downloadFile = async () => {
    try {
      const res = await dispatch(downloadFinishFile({ session_id: file_id! })).unwrap();

      // Create a Blob from the response
      const blob = new Blob([res], { type: 'application/octet-stream' }); // MIME type for .xlsx
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file_id}.xlsx`; // Set the desired filename
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Button onClick={downloadFile} appearance={'primary'} className={'ml-auto'}>
      Скачать файл
    </Button>
  );
};
