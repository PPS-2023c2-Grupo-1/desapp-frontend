import axios from "@util/axios"


export const passwordReset = async (resetId: any, password: any, role: string | undefined) => {
  try {
    const response = await axios.patch(`/${role}/validateReset/${resetId}`, {
      password: password
    })
    return Promise.resolve(response.data)
  } catch (err) {
    console.error(err)
  }
}

export const resetPasswordForUser = async ( mail: string, role: string, id: number ) => {
  try {
    console.log(mail, role, id, )
    console.log('hasta aca llego');
    const response = await axios.post(`/passwordReset/`, {
      
      mail: mail,
      role: role,
      id: id,
     
    })
    return Promise.resolve(response.data)
  } catch (err) {
    console.error(err)
  }
}
