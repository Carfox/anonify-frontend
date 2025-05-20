export const environment = {
  production: false,
  apiUrl: 'http://18.116.152.131:7008',
  apiCarfox: 'http://127.0.0.1:8000',
  routes: {
    anoninaus: {
      uploadCSV: {
        url: `files/upload-csv`,
        name: 'Subir CSV',
      },
      originalFileData: {
        url: `files/original-data`,
        name: 'Subir CSV',
      },
      previewCSV: {
        url: 'files/preview',
        name: 'Vista previa',
      },
      downloadTempCSV: {
        url: 'files/download-temp-csv',
        name: 'Descargar CSV',
      },
      headersCSV: {
        url: 'files/get-headers/',
        name: 'Obtiene los headers de un archivo previamente subido',
      },
    },
    other: {
      login: {
        url: '/api/login',
        name: 'Obtiene los datos de un usuario',
      },
      allProjects: {
        url: '/api/user/projects',
        name: 'Obtiene todos los proyectos de un usuario',
      },
      addNewProject: {
        url: '/api/projects',
        name: 'Obtiene todos los proyectos de un usuario',
      },
    },

    // Add more routes as needed
  },
};
