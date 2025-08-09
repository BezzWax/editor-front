export const getUserToken = (): string | null => {
  try {
    const userTokenString = localStorage.getItem('token')
    if (!userTokenString) return null
    
    return userTokenString
  } catch (error) {
    console.error('Error getting user token:', error)
    return null
  }
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
