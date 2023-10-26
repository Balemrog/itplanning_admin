const prod = {
    url: {
        API_BASE_URL: 'https://itplanning-services-b2f25175a56f.herokuapp.com',
    }
}

const dev = {
    url: {
        API_BASE_URL: 'http://localhost:8080'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod