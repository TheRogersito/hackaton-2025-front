import axios from 'axios';

interface kycData {
  phoneNumber: string;
  idDocument: string;
  name: string;
  givenName: string;
  familyName: string;
  address: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  region: string;
  locality: string;
  country: string;
  birthdate: string;
  email: string;
  gender: string;
}

interface KycResponse {
  idDocumentMatch: boolean; // Aquí puedes incluir otras propiedades que sean necesarias
}

export async function kyc(kycData: kycData): Promise<KycResponse> {
  const options = {
    method: 'POST',
    url: 'https://kyc-match.p-eu.rapidapi.com/kyc-match/kyc-match/v0.2/match',
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'x-rapidapi-host': 'kyc-match.nokia.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: kycData,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    // Asegúrate de que la respuesta contenga idDocumentMatch
    return {
      idDocumentMatch: response.data.idDocumentMatch,  // Asegúrate de que `idDocumentMatch` sea parte de la respuesta
    };
  } catch (error) {
    console.error(error);
    // Retorna un objeto por defecto en caso de error
    return {
      idDocumentMatch: false,
    };
  }
}
