import { Course, CourseAdapter, ICourse, ICourseResponse, IUser, IUserResponse, User } from "@models"
import { deleteStudent, patchStudent } from "@src/services"
import { fixString } from "@src/util"

export interface IStudent extends IUser {
  about?: string,
  birthdate?: Date,
  comision?: number,
  dni?: string,
  password?: string,
  phone?: string,
  picture?: string,
  rondina?: number,
  courses: {
    current: ICourse
    others: number[],
    parent?: ICourse,
    lastChangeDate: Date,
  },
  isEnabled: boolean
}

export interface IStudentResponse extends IUserResponse {
  about: string | null,
  birthDate: string | null,
  dni: string | null,
  comision: number  | null,
  fecha_cambio_materia_cursada: string,
  habilitado: number
  materia2: string,
  materia_cursada: ICourseResponse,
  materia_padre_cursada: ICourseResponse | null,
  password: string,
  phone: string | null,
  picture: string | null,
  rondina: number | null,
}

export class Student extends User {
  private _about?: string
  private _birthdate?: Date
  private _comision?: number
  private _dni?: string
  private _isEnabled?: boolean
  private _password?: string
  private _phone?: string
  private _picture?: string
  private _rondina?: number
  private _courses: {
    current: ICourse,
    others: number[],
    parent?: ICourse,
    lastChangeDate: Date,
  }
  
  constructor(student: IStudent | undefined) {
    if(student === undefined) {
      super({ id: -1, email: '', name: { first: '', last: '' } })
      this._courses = {
        current: {
          id: -1, isPreviousCourse: false, parent: -1, name: '',
          year: ""
        },
        others: [],
        lastChangeDate: new Date(), 
        parent: { id: -1, isPreviousCourse: false, parent: -1, name: ''},
      }
    } else {
      super(student)
      this._about = student.about
      this._birthdate = student.birthdate
      this._comision = student.comision
      this._courses = student.courses
      this._dni = student.dni
      this._picture = student.picture
      this._isEnabled = student.isEnabled
      this._phone = student.phone
      this._rondina = student.rondina
    }
  }

  set course(course: ICourse) { this._courses.current = course }
  get course(): ICourse { return this._courses.current }
  get phone(): string { return this._phone || '' }
  get dni(): string | undefined { return this._dni }
  get birthdate(): Date | undefined { return this._birthdate }
  get comision(): number | undefined { return this._comision }
  get rondina(): number | undefined { return this._rondina }
  get about(): string | undefined { return this._about }
  get isEnabled(): boolean | undefined { return this._isEnabled }

  async delete(): Promise<any> { return deleteStudent(this._id || -1) }
  async patch(): Promise<any> { return patchStudent(this.json) }

  get json(): IStudent {
    return {
      ...super.json,
      about: this._about,
      birthdate: this._birthdate,
      comision: this._comision,
      courses: this._courses,
      dni: this._dni,
      isEnabled: !!this._isEnabled,
      phone: this._phone,
      picture: this._picture,
      role: this._role,
      rondina: this._rondina,
    }
  }

  makeRequest(): IStudentResponse {
    return {
      ...super.makeRequest(),
      phone: this._phone || null,
      dni: this._dni || null,
      password: this._password || 'student',
      birthDate: this._birthdate?.toDateString() || null,
      fecha_cambio_materia_cursada: this._courses.lastChangeDate.toDateString(),
      materia_cursada: new Course(this._courses.current).makeRequest(),
      materia_padre_cursada: this._courses.parent ? new Course(this._courses.parent).makeRequest() : null,
      comision: this._comision || null,
      rondina: this._rondina || null,
      about: this._about || null,
      picture: this._picture || null,
      materia2: this._courses.others.join(),
      habilitado: this._isEnabled ? 1 : 0,
    }
  }
}

export class StudentAdapter extends Student {
  constructor(response: IStudentResponse) {
    const {
      dni,
      rondina,
      course,
      about,
      comision,
      phone,
      picture,
      birthDate,
      materia_cursada,
      fecha_cambio_materia_cursada,
      materia_padre_cursada,
      name,
      lastName,
      materia2,
      habilitado,
      ...rest
    } = response
  
    super({
      ...rest,
      dni: dni || undefined,
      comision: comision || undefined,
      rondina: rondina || undefined,
      about: fixString(about),
      phone: fixString(phone),
      picture: picture || '',
      name: { first: fixString(name), last: fixString(lastName) },
      birthdate: !!birthDate ? new Date(birthDate) : undefined,
      courses: {
        current: new CourseAdapter(materia_cursada).json,
        others: materia2 ? materia2.split(',').map(x => parseInt(x)) : [],
        parent: materia_padre_cursada ? new CourseAdapter(materia_padre_cursada).json : undefined,
        lastChangeDate: new Date(fecha_cambio_materia_cursada),
      },
      isEnabled: habilitado !== 0
    })
  }
}
