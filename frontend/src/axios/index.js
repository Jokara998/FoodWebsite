import axios from 'axios'

var axs = axios.create({
  baseURL: 'http://localhost:8080',
})

export default axs;