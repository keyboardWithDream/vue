# Vue基本指令

## `v-once`

该指令表示元素和组件只渲染一次，当数据发生改变时，展示内容不会进行更新

```html
<h1 v-once>{{message}}</h1>	
```

---

## `v-html`

某些情况下，从服务器请求到的数据本身就是一个HTML代码，可以使用该指令进行对代码的解析并渲染

```html
<div id="app">
  <h1 v-html="url"></h1>
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      url: '<a href="http://www.baidu.com">百度一下</a>'
    }
  })
```

---

## `v-text`

该指令和`Mustache`比较相似，用于将数据显示在界面中

```html
<h1 v-text="message"></h1>
```

---

## `v-pre`

该指令将标签内的内容不进行解析渲染，直接展示

```html
<h1 v-pre>{{message}}</h1>
```

![结果展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201226143121.png)

---

## `v-cloak`

当Vue实例初始化完成时，`v-cloak`属性会自动从表标签中删除

```html
<div id="app" v-cloak>{{message}}</div>
```

同时可设置一个`style`样式，使其隐藏，这时如果js代码没有执行完成时，页面将不会显示任何内容，可增强用户体验

```html
<style>
  [v-cloak] {
      display: none;
  }
</style>
```

---

## `v-bind`

该指令可以动态的绑定元素的一些属性，其语法糖为：`:`

```html
<a v-bind:href="url">百度一下</a>
<img v-bind:src="imageUrl" alt="图片">
<!-- 语法糖 -->
<a :href="url">百度一下</a>
<img :src="imageUrl" alt="图片"> 
```