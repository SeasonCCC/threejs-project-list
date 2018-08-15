import * as style from '../scss/reset.scss'
import * as back from '../assets/back.png'
// import * as THREE from 'three';
//
// class Student {
//   fullName: string;
//   constructor(public firstName, public middleInitial, public lastName) {
//     this.fullName = firstName + " " + middleInitial + " " + lastName;
//     console.log(THREE)
//
//   }
// }
//
// interface Person {
//   firstName: string;
//   lastName: string;
// }
//
// function greeter(person: Person) {
//   return "Hello, " + person.firstName + " " + person.lastName;
// }
//
// let user = new Student("Jane", "M.", "User");
//
// document.body.innerHTML = greeter(user);

// const game = new Game()
// game.init()

// console.log('../' + back)

const img = new Image();
img.onload = function() {
  const canvas = document.createElement('canvas')
  canvas.className = style.container;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 100, 100);

  document.body.appendChild(canvas)
  // document.body.appendChild(img)
}
img.src = '../' + back;
