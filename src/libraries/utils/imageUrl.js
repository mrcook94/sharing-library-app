import constants from './constants';

export const URL_IMAGE = {
    urlUserAvatar: function(img_path) {
        return `${constants.BASE_URL_IMG}/users/${img_path}`
    },
}
