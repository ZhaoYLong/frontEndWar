// 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的

interface Person {
  firstName: string;
  lastName: string;
}

function greeter2(person: Person) {
  return "hello, " + person.firstName + " " + person.lastName;
}

let user2 = { firstName: 'Jane', lastName: "User"};
document.body.innerHTML = greeter2(user2);
