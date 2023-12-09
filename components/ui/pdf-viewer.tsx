import React from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer() {

  const newplugin = defaultLayoutPlugin()
  const filePdf = '/sample.pdf'
  const fileName = filePdf.split('/').pop()
  
  return (
    <div className="container">
      <div className="text-lg text-center font-semibold my-3 mx-4 overflow-auto">{fileName}</div>
      <div className="w-full h-[800px]">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={filePdf} plugins={[newplugin]} />
        </Worker>
      </div>
    </div>
  )
}
