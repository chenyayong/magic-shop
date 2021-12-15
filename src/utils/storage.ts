interface IObject {
  key: string
  data?: any
  success?: (data: any) => void
  fail?: () => void
  complete?: () => void
}
export const setStorage = (object: IObject) => {
  const storage = window.localStorage
  storage.setItem(object.key, object.data)
}

export const getStorage = (object: IObject) => {
  const storage = window.localStorage
  return storage.getItem(object.key)
}

export const removeStorage = (object: IObject) => {
  const storage = window.localStorage
  storage.removeItem(object.key)
}

export const clearStorage = () => {
  const storage = window.localStorage
  storage.clear()
}
