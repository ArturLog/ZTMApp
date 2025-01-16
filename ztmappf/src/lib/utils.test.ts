import { fetchData } from '@/lib/utils';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  it('should fetch data successfully with correct parameters', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    mockedAxios.request.mockResolvedValueOnce(mockResponse);

    const result = await fetchData('test-path', { method: 'GET' });

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://localhost:3003/test-path',
        method: 'GET',
      })
    );
    expect(result.data).toEqual(mockResponse.data);
  });

  it('should throw an error if the request fails', async () => {
    mockedAxios.request.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchData('test-path', { method: 'GET' })).rejects.toThrow('Network Error');
  });
});
