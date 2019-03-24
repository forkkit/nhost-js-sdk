import axios from 'axios';

export default class hbp {
  constructor(config) {
    this.endpoint = config.endpoint;
  }

  async register(username, password) {

    const data = {
      username,
      password
    };

    let res;
    try {
      res = await axios(`${this.endpoint}/auth/register`, {
        method: 'post',
        data: {
          email: username,
          password,
        },
        withCredentials: true,
      });
    } catch (e) {
      throw e.response;
    }
  }


  // Storage Upload
  async upload(path, files, onUploadProgress = false) {

    let form_data = new FormData();

    files.forEach(file => {
      form_data.append('files', file);
    });

    const upload_res = await axios.post(`${this.endpoint}/storage/upload`, form_data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-path': path,
      },
      onUploadProgress: onUploadProgress,
      withCredentials: true,
    });

    return upload_res.data;
  }

  url(path) {
    return `${this.endpoint}/storage/file/${path}`;
  }
}
