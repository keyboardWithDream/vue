# Vue起步入门

## 引入Vue.js

在html中引入Vue.js或者下载文件后引入

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

---

## 创建Vue对象

使用`new Vue()`创建Vue对象

```html
<script>
const app = new Vue()
</script>
```

---

## 挂载元素

使用`el`属性将Vue对象挂载到某一个元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello Vue</title>
</head>
<body>
<div id="app">
  <h1>{{message}}</h1>
</div>
</body>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    //挂载元素
    el: '#app'
  })
</script>
</html>
```

---

## 定义及展示数据

使用`data`属性存放需要使用的数据用于页面的展示

*在挂载的元素中使用`{{}}`或`v-bind`进行绑定显示数据*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello Vue</title>
</head>
<body>
<div id="app">
  <!-- 显示数据 -->
  <h1>{{message}}</h1>
</div>
</body>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    //挂载元素
    el: '#app',
    //定义数据
    data: {
      message: "Hello Vue.js!"
    }
  })
</script>
</html>
```

![结构展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201224223308.png)

*同时可以在`data`中定义多种复杂类型的数据，如数组*

```html
<script>
  const app = new Vue({
    //挂载元素
    el: '#app',
    //定义数据
    data: {
      message: "Hello Vue.js!",
      //定义数组
      languages: ['Chinese', 'English', 'Japanese', 'French']
    }
  })
</script>
```

*在展示数组时，我们可以使用`v-for`进行对数组的遍历*

```html
<ul>
  <li v-for='language in languages'>{{language}}</li>
</ul>
```

![结构展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201224223229.png)

---

## 计数器小案例

*使用`v-on`进行绑定事件，`v-on`可以绑定元素自有的事件，也可以绑定自己声明的事件*

注意：`v-on`可使用`@`语法替换，如`v-on:click` = `@click`

```html
<body>
<div id="app">
  <h2>当前计数：{{counter}}</h2>
  <!-- 绑定button的click事件 -->
  <button v-on:click="count++">+</button>
  <button v-on:click="count--">-</button>
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      counter: 0
    }
  })
</script>
```

*如果需要绑定自己声明的事件，需要在`methods`属性中声明*

==注意：如果在对象中访问`data`中的数据，需要使用`this`关键字==

```html
<div id="app">
  <h2>当前计数：{{counter}}</h2>
  <!-- 绑定自己的方法 -->
  <button v-on:click="add">+</button>
  <button v-on:click="sub">-</button>
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      counter: 0
    },
    //声明自己的方法
    methods: {
      add: function () {
        console.log("add被执行...");
        this.counter ++;
      },
      sub: function () {
        console.log("sub被执行...");
        this.counter --;
      }
    }
  })
</script>
```

![结构展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201224224955.png)

---

## MVVM简单介绍

### View层

> View层为视图层，在前端开发中，通常指DOM层，主要作用是给用户展示各种信息。

### Model层

> Model层为数据层，数据可能是前端固定的死数据，更多的是来自服务器，在计数器案例中，就是后面抽取出来的obj。

### VueModel层

> VueModel层为视图模型层，视图模型层是View和Model沟通的桥梁，一方面它实现了`Data Binding`，也就是数据绑定，将`Model`的改变实时的反应到`View`中，另一方面它实现了`DOM Listener`，也就是DOM监听，当DOM发生一些事件（点击，滚动，touch等）时，可以监听到，并在需要的情况下改变对应的Data。

![简单解析](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202020-12-24%20230423.png)

---

## Vue实例中的options

| option    | 类型                      | 作用                                                         |
| --------- | ------------------------- | ------------------------------------------------------------ |
| `el`      | `string`|`HTMLElement`    | 决定Vue实例会管理哪一个DOM                                   |
| `data`    | `object`|`Function`       | Vue实例对应的数据对象                                        |
| `methods` | `{[key:string]:Function}` | 定义属于Vue的一些方法，可以在其他地方调用，也可以在指令中使用 |

