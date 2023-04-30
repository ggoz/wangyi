import axios from "axios";

// 根路径封装
let service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

export default service