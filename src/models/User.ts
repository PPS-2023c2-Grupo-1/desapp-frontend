import { ICourseResponse, Jtp } from "@models"

export interface ICredentials {
    email: string,
    password?: string,

  }

export interface IUser extends ICredentials{
    id?: number,
    role?: string,
 
    name: {
      first: string,
      last: string
    }
  }

export interface IUserResponse {
    id?: number,
    role?: string,
    course?: ICourseResponse | null,
    name: string,
    lastName: string,
    email: string,
    
}

interface IName {
    first: string,
    last: string,
  }
  
export class User {
  protected _id: number | undefined
  protected _role: string | undefined
  protected _name!: IName
  protected _email!: string
 

  constructor(user: IUser | undefined) {
    if(user === undefined) return

    this._id = user.id
    this._name = {
      first: user.name.first,
      last: user.name.last,
    } 
    this._email = user.email
    this._role = user.role
  }

  get id(): number { return this._id || -1 }
  get name(): IName { return this._name }
  get email(): string { return this._email }
  get role(): string | undefined { return this._role }
  //get hash_id(): string { return this._hash_id }
  get firstname(): string { return this.name.first }
  get lastname(): string { return this.name.last }

  set firstname(firstname: string) { this._name.first = firstname }
  set lastname(lastname: string) { this._name.last = lastname }
  set email(email: string) { this._email = email }

  get json(): IUser {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      role: this._role,
    }
  }

  fullName(): string {
    return `${this._name.first} ${this._name.last}`
  }

  makeRequest(): IUserResponse {
    return {
      name: this._name.first,
      lastName: this._name.last,
      email: this._email,
    }
  }
}

export class UserAdapter extends User {
  constructor(response: IUserResponse) {
    const { name, lastName, ...rest } = response
  
    super({
      ...rest,
      id: response.id || -1,
      name: { first: name, last: lastName},
      role: response.role?.toLocaleLowerCase(),
    })
  }
}
