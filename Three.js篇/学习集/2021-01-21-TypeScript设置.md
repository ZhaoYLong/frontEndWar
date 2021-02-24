three.js是一个基于JavaScript的库，但是可以在TypeScript中使用Three.js，因为该库公开了声明文件Declaration files

- TypeScript编译器需要最少的配置即可发现three.js类型
  - 你需要设置moduleResolution（模块解析）为node和target（目标）为ES6或者更高版本

  ```json
    // tsconfig.json文件最少配置例子
    {
      "compilerOptions": {
        "target": "es6",
        "moduleResolution": "node",
      },
      "include": ["./src/**/*.ts"],
    }
  ```

  - 注意：到目前为止，如果不使用这两个选项，则无法使用three.js类型。 