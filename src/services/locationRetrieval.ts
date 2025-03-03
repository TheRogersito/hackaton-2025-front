import axios from 'axios';

export async function locationRet(phoneNumber: string) {

    const options = {
        method: 'POST',
        url: 'https://location-retrieval.p-eu.rapidapi.com/retrieve',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'location-retrieval.nokia.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          device: {
            phoneNumber: phoneNumber
          },
          maxAge: 3600
        }
      };

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

// locationRet('+21421601234567');