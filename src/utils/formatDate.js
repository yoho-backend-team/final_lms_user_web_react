

export const formatDate = (iosString) => {
    const date = new Date(iosString)
    const format = { day: "numeric", month: "long", year: 'numeric' }
    const formatedDate = date.toLocaleDateString("en-GB",format)
    return  formatedDate
}

export const formatTime = (iosString) => {
    const date = new Date(iosString)
    const format = { hour: "numeric", minute: "numeric", hours12: true}
    return date.toLocaleTimeString('en-US',format)
}