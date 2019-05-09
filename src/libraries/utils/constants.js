const constants = {
    BASE_URL: 'https://sharing-library-server.herokuapp.com',
    BASE_API: 'https://sharing-library-server.herokuapp.com/api',
    BASE_URL_IMG: 'https://sharing-library-server.herokuapp.com/uploads' ,
    
    SERVER_TIMEOUT: 10000,

    BOOK_STATUS: {
        available: 1,
        unavailable: 2,
        pending: 0,
    },

    REQUEST_TYPE: {
        BORROW: 1,
        CONTRIBUTE: 2,
    },

    REQUEST_STATUS: {
        PENDING: 1,
        ACCEPTED: 2,
        REJECTED: 3,
        FINISHED: 4,
    },
}

export default constants;