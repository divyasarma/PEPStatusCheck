const SampleInvokeAPI = require( "../DataExtraction/SampleInvoke");
const axios = require('axios');

jest.mock('axios');

test('test getposts method is calling mock axios', () => {

  const resp = {data: []};
  axios.get.mockResolvedValue(resp);
    SampleInvokeAPI.getPosts('Vincenzo AMENDOLA').then((res) => {
      expect(SampleInvokeAPI.dataSetInfo).toEqual(resp.data);
    });
       
});