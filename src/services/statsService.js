import httpClient from '../lib/httpClient'

export const statsService = {
    getStats: () => 
        httpClient.get('/gateway/stats')
}
