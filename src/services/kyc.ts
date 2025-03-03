import axios from 'axios';

interface kycData {
  phoneNumber: string
  idDocument: string
  name: string
  givenName: string
  familyName: string
  address: string
  streetName: string
  streetNumber: string
  postalCode: string
  region: string
  locality: string
  country: string
  birthdate: string
  email: string
  gender: string
}

export async function kyc(kycData: kycData) {

    const options = {
        method: 'POST',
        url: 'https://kyc-match.p-eu.rapidapi.com/kyc-match/kyc-match/v0.2/match',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'kyc-match.nokia.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: kycData
    };

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

// kyc({
//   phoneNumber: '+34646519770',
//   idDocument: 'FIC80142',
//   name: 'Marta Galeano Grijalba',
//   givenName: 'Marta',
//   familyName: 'Galeano Grijalba',
//   address: 'Calle Josep Pla 1, Planta 2, Puerta 2, Sanc Marc de Tarragona, Tarragona, Tarragona, 43007',
//   streetName: 'Josep Pla',
//   streetNumber: '1',
//   postalCode: '43007',
//   region: 'Tarragona',
//   locality: 'Tarragona',
//   country: 'ES',
//   birthdate: '2000-01-01',
//   email: 'csp.nacintegrations@nokia.com',
//   gender: 'FEMALE'
// })