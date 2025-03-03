import axios from 'axios';

export async function qosSession(phoneNumber: string) {

    const options = {
        method: 'POST',
        url: 'https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'quality-of-service-on-demand.nokia.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          qosProfile: 'QOS_L',
          device: {
            phoneNumber: phoneNumber
          },
          applicationServer: {
            ipv4Address: '0.0.0.0'
          },
          duration: 600 // 10 minutes
        }
      };

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

// qosSession('+34646519770');