import axios from 'axios';

const API_KEY = '35911258-fcb6b6dc3bb23cdb1dc2ebeb9';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const defaultParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  key: API_KEY,
};

export async function getImgs({ searchQuery, currentPage }) {
  const params = {
    ...defaultParams,
    q: searchQuery,
    page: currentPage,
  };

  const response = await axios.get('', { params });

  return response.data;
}
