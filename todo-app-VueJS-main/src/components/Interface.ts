export interface userInterface {
  fullName: string
  email: string
  password: string
}

export interface Task {
  id?: number
  userId: string
  title: string
  details: string
  startDate: string
  endDate: string
  completed?: boolean
}

export interface FormError {
  [key: string]: string
}
