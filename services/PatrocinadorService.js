const URI = 'https://api.cartolafc.globo.com';

export default {
    async fetchPatrocinadores() {
        try {
            let response = await fetch(URI + '/patrocinadores');
            let responseJsonData = await response.json();

            return responseJsonData;
        }
        catch(e) {
            console.log(e);
        }
    }
}