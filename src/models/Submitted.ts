import {
  IAssignment,
  AssignmentAdapter,
  IAssignmentResponse,
  ICourse,
  IStudent,
  StudentAdapter,
  IStudentResponse,
  IJtp,
} from '@models'
import { fixString } from '@src/util'

export interface ISubmittedResponse {
  assignment: IAssignmentResponse | null,
  student: IStudentResponse | null,
  id: number,
  members: string,
  tags: string ,
  public: boolean,
  frontPage: string,
  dataSubmitted: string,
  qualification: string,
  average: number,
  reflections: string,
  studentPublic: number,
}

export interface ISubmitted {
  assignment?: IAssignment,
  student?: IStudent,
  jtp?: IJtp,
  course?: ICourse,
  id: number,
  members: number[],
  tags: string[],
  public: boolean,
  cover: string,
  date: Date,
  qualification: string,
  average: number,
  reflections: string,
  studentPublic: boolean,
}

export class Submitted {
  private submitted: ISubmitted

  constructor(submitted: ISubmitted) {
      const { assignment } = submitted
      
      if (assignment) {
        let _submitted = submitted
        const {
          course,
          jtp,
          ..._assignment
        } = assignment

        if (_assignment) _submitted.assignment = _assignment
        if (!submitted.course) _submitted.course = course
        if (!submitted.jtp) _submitted.jtp = jtp

        this.submitted = _submitted
      } else {
        this.submitted = submitted
      }
  }

  get date(): string {
    const date = this.submitted.date
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  }
  get json(): ISubmitted { return this.submitted }
}

export class SubmittedAdapter extends Submitted{
  constructor(response: ISubmittedResponse){
    super({
      id: response.id,
      assignment: response.assignment ? new AssignmentAdapter(response.assignment).json : undefined,
      members: response.members.split(',').map(x => parseInt(x)) ,
      tags: response.tags.split(' '),
      public: response.public,
      cover: response.frontPage,
      date: new Date(response.dataSubmitted),
      qualification: fixString(response.qualification),
      average: response.average,
      reflections: fixString(response.reflections),
      studentPublic: response.studentPublic === 1,
      student: response.student ? new StudentAdapter(response.student).json : undefined
    })
  }
}