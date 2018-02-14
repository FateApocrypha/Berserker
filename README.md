### Introduction

Template engines like Vue

### TodoList

* [x] 1、Setting up the development environment
* [x] 2、The basic compiler finished
* [x] 3、Parsed the tokens
* [x] 4、Generated the expression and filled the value into the express
* [x] 5、The basic directive system
* [x] 6、Finished the directive of text
* [x] 7、Add the method of rendering the normal attribute
* [x] 8、Add the directive of if and show
* [x] 9、Style directive that supports object writing and array writing
* [x] 10、Add src and href directive
* [x] 11、Class directive that supports object writing and array writing
* [ ] 12、Finished each directive
  ### Usage

```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div class="app">
    <p :show="flag">
      {{ test }}
    </p>
    <p :if="1 + 1 === 2">test if</p>
    <img :src="image" alt="">
    <a :href="link">链接测试</a>
    <div :style="{color: activeColor, fontSize: size}">测试一下style指令的对象写法</div>
    <div :style="[styleObj]">测试一下style数组写法</div>
  </div>
</body>
<script src="./berserker.js"></script>
<script>
  const data = {
    activeColor: 'red',
    size: '14px',
    link: 'https://www.baidu.com',
    image: 'http://h0.hucdn.com/open/201806/395b7d4f974cd6b9_200x200.jpg',
    flag: false,
    test: '1111',
    styleObj: {
      color: '#ff4965',
      fontSize: '20px'
    }
  }
  berserker({
    template: document.querySelector('.app'),
    data
  })
</script>

</html>
```
