const constants = {
    BASE_URL: 'https://sharing-library-server.herokuapp.com',
    BASE_API: 'https://sharing-library-server.herokuapp.com/api',
    BASE_URL_IMG: 'https://sharing-library-server.herokuapp.com/uploads',

    GOOGLE_BOOK_API: 'https://www.googleapis.com/books/v1/',
    
    SERVER_TIMEOUT: 10000,

    BOOK_STATUS: {
        available: 1,
        unavailable: 2,
        pending: 0,
    },

    MEMBER_RANK: {
        BRONZE: 0,
        SILVER: 1,
        GOLD: 2,
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

    NOTIFY_TYPE: {
        REQUEST: 1,
        REMIND: 2,
        POINT: 3,
        RANK_CHANGE: 4,
    },

    NOTIFY_STATUS: {
        READ: 1,
        UNREAD: 0,
    },
}

export default constants;