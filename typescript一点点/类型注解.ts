function greeter (person: string) {
  return "Hello, " + person;
}

let user = '赵仔'
document.body.innerHTML = greeter(user);

// TypeScript提供了静态的代码分析，可以分析代码结构和提供的类型注解

// 尽管有错误，这个`.ts`文件还是被编译通过了，但是这种情况下，TypeScript会警告你代码可能不会按预期执行

