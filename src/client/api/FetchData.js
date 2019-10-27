import axios from 'axios';

export default class FetchData {
  static getLatestData = async () => {
    try {
      const response = await axios.get('/api/test');
      console.log({ response });
    } catch (e) {
      console.error({ e });
    }
  };
}
