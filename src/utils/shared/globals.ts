export const getUserToken = () => {
  const userTokenString = localStorage.getItem('token')
  if (!userTokenString) return null

  const userToken = JSON.parse(userTokenString)

  return userToken
}

export const pagesToHideFooter = [{ isHideOnlyMobile: true, pathname: '/cart' }]

export const getCookie = (name: string) => {
  const decodedCookies = decodeURIComponent(document.cookie)
  const cookiesArray = decodedCookies.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }

  return null
}
