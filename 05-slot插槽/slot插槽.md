# slot插槽

> 组件的插槽是为了让我们封装的组件更加具有扩展性，让使用者可以决定组件内部的一些内容到底展示什么

## 插槽的基本使用

在组件中使用`<slot></slot>`标签即可定义一个插槽，可以在标签中放入默认值。

通过使用组件时，将需要的元素或组件放入，即可替换。

```html
<body>
<div id="app">
  <!-- 使用插槽 -->
  <cpn>
    <button>按钮</button>
  </cpn>
  <hr>
  <cpn>
    <a href="http://www.baidu.com">百度一下</a>
  </cpn>
  <hr>
  <cpn></cpn>
</div>

<template id="myTemplate">
  <div>
    <h2>我是组件</h2>
    <p>我是组件，Hello Vue.js！</p>
    <!-- 插槽 -->
    <slot><span>当前没有使用插槽</span></slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js'
    },
    //注册组件
    components: {
      cpn: {
        template: '#myTemplate'
      }
    }
  })
</script>
```

效果展示：![效果展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201226232553.png)

---

## 具名插槽

> 当插槽数量很多时，我们可以给插槽定义名称，在使用时通过名称指定需要的插槽

```html
<template id="myTemplate">
  <div>
    <!-- 插槽 -->
    <slot name="left"><span>左边</span></slot>
    <slot name="center"><span>中间</span></slot>
    <slot name="right"><span>右边</span></slot>
  </div>
</template>
```

使用时使用`slot='xxx'`

```html
<cpn>
  <button slot="left">按钮</button>
  <a slot="center" href="#">链接</a>
  <span slot="right">哈哈哈哈</span>
</cpn>
```

效果展示：![效果展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201226233531.png)

---

## 作用域插槽

```html
<div id="app">
  <cpn></cpn>
  <hr>
  <cpn>
    <!-- 使用插槽时指定作用域 -->
    <template slot-scope="slot">
      <span v-for="item in slot.data">{{item}}</span>
    </template>
  </cpn>
</div>

<template id="myTemplate">
  <div>
    <!-- 绑定数据 -->
    <slot :data="movies">
      <ul>
        <li v-for="item in movies">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    components: {
      cpn: {
        template: '#myTemplate',
        data() {
          return {
            movies: ["《信条》", "《你的名字》", "《让子弹飞》", "《阿甘正传》", "《盗梦空间》"]
          }
        }
      }
    }
  })
</script>
```

效果展示：![效果展示](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201227000857.png)

