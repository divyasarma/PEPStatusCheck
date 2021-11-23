const axios = require('axios');

const dataSetInfo = [];
const regex = new RegExp('CIA|Politician|Parliament|Members of the European commitee of the Regions');
const regexCIA = new RegExp('CIA');
const regexPol = new RegExp('Politician');
const regexParl = new RegExp('Parliament');
const regexEurope = new RegExp('Members of the European commitee of the Regions');
//Extract data from external api call
getPosts =  (name) => {
    console.log("logging the name",name);
    return axios.get(
        `https://stacc-code-challenge-2021.azurewebsites.net/api/pep?name=${name}`).then((resp) => {
            if(resp &&  resp.data){
                if(resp.data.numberOfHits) {
                    (resp.data).hits.forEach((hit) => {
                        if (hit?.schema === 'Person' && (hit?.dataset === ('Every Politician') || hit?.dataset === ('CIA World Leaders')
                            || regex.test(hit?.dataset.toString()))) {
                                if(regexPol.test(hit?.dataset.toString())){
                                    dataSetInfo.push({
                                        name: hit?.name,
                                        birth_date: hit?.birth_date || 'Not Available',
                                        pepStatus: `PEP`,
                                        pepScore :'10',
                                    });
                                }else if(regexCIA.test(hit?.dataset.toString())){
                                    dataSetInfo.push({
                                        name: hit?.name,
                                        birth_date: hit?.birth_date || 'Not Available',
                                        pepStatus: `PEP`,
                                        pepScore :'6',
                                    });
                                }else if(regexParl.test(hit?.dataset.toString())){
                                    dataSetInfo.push({
                                        name: hit?.name,
                                        birth_date: hit?.birth_date || 'Not Available',
                                        pepStatus: `PEP`,
                                        pepScore :'8',
                                    });
                                }else if(regexEurope.test(hit?.dataset.toString())){
                                    dataSetInfo.push({
                                        name: hit?.name,
                                        birth_date: hit?.birth_date || 'Not Available',
                                        pepStatus: `PEP`,
                                        pepScore :'4',
                                    });
                                }else{
                            dataSetInfo.push({
                                name: hit?.name,
                                birth_date: hit?.birth_date || 'Not Available',
                                pepStatus: `PEP`,
                                pepScore :'0',
                            });
                        }
                        } else {
                            dataSetInfo.push({
                                name: hit?.name,
                                birth_date: hit?.birth_date || 'Not Available',
                                pepStatus: ` Not PEP`,
                                pepScore: 'NA'
                            });
                        }
                    });
                }
                console.log("Logging dataSetInfo" ,dataSetInfo);
            }
        }).catch((err) => {
        console.log("Error: " + err.message);
    });
}
module.exports = {
    getPosts,dataSetInfo,
};
