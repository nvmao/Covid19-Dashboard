

const    APIKEY_APINEWS = 'aaa51825c78e45e09e1610bf432e6998'
const    CURRENT_DATE = `${new Date().getFullYear()}-${new Date().getMonth}-${new Date().getDay()}`

const api = {
    

    GET_NEWS : `https://newsapi.org/v2/everything?q=COVID&from=${CURRENT_DATE}&sortBy=publishedAt&apiKey=${APIKEY_APINEWS}&pageSize=80&page=1`,
    SUMMARY_ALL_COUNTRY: 'https://corona.lmao.ninja/v2/countries',
    TIMELINE_ALL : 'https://corona.lmao.ninja/v2/historical/all?lastdays=all',
    TIMELINE_COUNTRY: 'https://corona.lmao.ninja/v2/historical/',
    GET_ALL : 'https://corona.lmao.ninja/v2/all',
    GET_COUNTRY:'https://corona.lmao.ninja/v2/countries/',
    GET_CONTINENTS : 'https://corona.lmao.ninja/v2/continents',
    TODAY_WORLD : 'https://disease.sh/v3/covid-19/jhucsse',
    
}
 
export default api
