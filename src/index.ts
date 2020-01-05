export class Hero {
    id: number;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    myName()
    {
        return this.name;
    }
  }

  let hero = new Hero('krunal');
  console.log(hero.myName());