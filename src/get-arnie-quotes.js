const { httpGet } = require("./mock-http-interface");

/**
 * main method which receives an array of Urls
 * @param  {} urls
 */
const getArnieQuotes = async (urls) => {
  let objResults = [];
  if (urls != undefined) {
    objResults = await getUrlResponse(urls);
  }
  return objResults;
};

/**
 * method which receives an array of Urls,
 * processes the response of each request,
 * formats the response and returns the
 * result as an array
 * @param  {} urlArray
 */
async function getUrlResponse(urlArray) {
  let responseArray = [];
  let strMessage = "";
  // parallel processing of the get requests using Promise.all
  let results = await Promise.all([
    httpGet(urlArray[0]),
    httpGet(urlArray[1]),
    httpGet(urlArray[2]),
    httpGet(urlArray[3]),
  ]);
  
  //processing the result of each response
  if (results.length > 0) {
    results.forEach((objResponse) => {
      strMessage = JSON.parse(objResponse.body).message;
      if (objResponse.status == 200) {
        objResult = { 'Arnie Quote': strMessage };
        responseArray.push(objResult);
      } else {
        objResult = { 'FAILURE': strMessage };
        responseArray.push(objResult);
      }
    });
  }

  return responseArray;
}

//exposing the getArnieQuotes method
module.exports = {
  getArnieQuotes,
};
