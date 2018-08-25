interface Options {
  el: string
}

export default class Game implements Options {
  el: string
  constructor(options: any) {
    // this.options = options;
    this.el = options.el
  }
  greet() {
    console.log(this.el)
  }
}
