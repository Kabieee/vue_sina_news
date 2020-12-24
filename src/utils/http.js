import {
    Spin,
    Message
} from 'view-design'
import axios from 'axios'

// const baseURL = 'http://localhost/sina-news'
const baseURL = 'https://proxy-api.dev.maxmelon.ru/sina-news'


const httpRequest = (requestObj = {}) => {
    return new Promise((resolve, reject) => {
        requestObj.baseURL = baseURL
        // requestObj.timeout = 9000

        Spin.show()
        let fullUrl = `${requestObj.baseURL}${requestObj.url}`
        console.log(`request start - ${fullUrl}`)

        axios.request(requestObj).then((res) => {
            if (res.data.code == 0) {
                resolve(res.data)
            } else {
                Message.error({
                    content: `${res.data.code} - ${res.data.msg}`,
                    duration: 3
                })
                reject(res.data)
            }



        }).catch((err) => {
            Message.error({
                content: `${fullUrl} - ${err.message}`,
                duration: 3
            })
            reject(err)
        }).finally(() => {
            Spin.hide()
            console.log(`request end - ${fullUrl}`)
        })
    })
}


export default httpRequest