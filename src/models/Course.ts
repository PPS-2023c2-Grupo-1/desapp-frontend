import { fixString } from "@src/util"

export interface ICourseResponse {
  id: number,
  isPreviousCourse: number,
  name: string,
  parentCourse: number | null,
  year: string,
}

export interface ICourse {
  id: number,
  isPreviousCourse: boolean,
  name: string,
  parent?: number ,
  year: string,
}

export class Course {
  private course!: ICourse

  constructor(course: ICourse){
    this.course = course
  }

  get json(): ICourse {
    return this.course
  }

  makeRequest(): ICourseResponse {
    return {
      id: this.course.id,
      isPreviousCourse: this.course.isPreviousCourse ? 1 : 0,
      name: this.course.name,
      parentCourse: this.course.parent ? 1 : 0,
      year: this.course.year,
    }
  }
}

export class CourseAdapter extends Course {
  constructor(course: ICourseResponse){
    super({
      id: course.id,
      name: fixString(course.name),
      parent: course.parentCourse ? course.parentCourse : undefined,
      year: fixString(course.year),
      isPreviousCourse: course.isPreviousCourse !== 0,
    })
  }
}