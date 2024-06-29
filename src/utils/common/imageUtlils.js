const BackEndUrl = process.env.REACT_APP_URL

export const getImageUrl = (imageKey) => {
    return imageKey ? `${BackEndUrl}/${imageKey}` : ''
}