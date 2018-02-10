### Introduction

Template engines like Vue

### TodoList

* [x] 1、Setting up the development environment
* [x] 2、The basic compiler finished
* [x] 3、Parsed the tokens
* [x] 4、Generated the expression and filled the value into the express
* [x] 5、The basic directive system
* [x] 6、Finished the directive of text
* [x] 7、Add the directive of show and render the normal attribute

### Usage

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div class="app">
    <p id="a">
      {{ test }}
    </p>
  </div>
</body>
<script src="./berserker.js"></script>
<script>
  const data = {
    test: '1111'
  }
  berserker({
    template: document.querySelector('.app'),
    data
  })
</script>

</html>
```
