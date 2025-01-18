export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000',
  routes: {
    uploadCSV: {
      url: '/upload-csv',
      name: 'Subir CSV',
    },
    previewCSV: {
      url: '/preview',
      name: 'Vista previa',
    },
    downloadTempCSV: {
      url: '/download-temp-csv',
      name: 'Descargar CSV',
    },
    headersCSV: {
      url: '/get-headers',
      name: 'Obtiene los headers de un archivo previamente subido',
    },
  },
};
