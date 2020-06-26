

const    APIKEY_APINEWS = 'aaa51825c78e45e09e1610bf432e6998'
const    CURRENT_DATE = `${new Date().getFullYear()}-${new Date().getMonth}-${new Date().getDay()}`

const api = {
    

    GET_NEWS : `https://newsapi.org/v2/everything?q=COVID&from=${CURRENT_DATE}&sortBy=publishedAt&apiKey=${APIKEY_APINEWS}&pageSize=80&page=1`,
    
}
 
export default api
