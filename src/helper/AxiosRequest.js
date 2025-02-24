import Axios from "axios";

class AxiosRequest {
  GetAxiosRequest = async (URL) => {
    return await Axios.get(`${process.env.REACT_APP_API_URL + URL}`);
  };
  PostAxiosRequest = async (URL, Data) => {
    return await Axios.post(`${process.env.REACT_APP_API_URL + URL}`, Data);
  };
  PutAxiosRequest = async (URL, Data) => {
    return await Axios.put(`${process.env.REACT_APP_API_URL + URL}`, Data);
  };
  DeleteAxiosRequest = async (URL, Data) => {
    return await Axios.delete(`${process.env.REACT_APP_API_URL + URL}`);
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AxiosRequest();
