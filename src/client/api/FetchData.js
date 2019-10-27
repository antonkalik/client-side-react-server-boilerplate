import axios from 'axios';

export default class FetchData {
  static getLatestData = async () => {
    try {
      const { data } = await axios.get('/api/test');
      return data;
    } catch (e) {
      console.error({ e });
    }
  };
}
