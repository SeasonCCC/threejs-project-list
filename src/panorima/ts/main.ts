import '../scss/_mixin.scss'

class Student {
  public fullName: string
  constructor (public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
}

interface IPerson {
  firstName: string
  lastName: string
}

function greeter (person: IPerson) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

const user = new Student('Jane', 'M.', 'User')

document.body.innerHTML = greeter(user)
