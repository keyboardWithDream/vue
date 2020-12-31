# Vue组件化

## 组件的使用步骤

> 调用`Vue.extend()`创建一个组件构造器，在创建构造器时传入需要使用的`template`模板即HTML复用的代码。然后调用`Vue.component()`将组件构造器注册为一个组件，并给组件取一个标签名称。使用组件的标签名在挂载的`Vue`实例元素下使用即可。

1. 创建组件构造器对象

   ```javascript
   //1.创建组件构造器对象
   const cpnC = Vue.extend({
     template: `<div>
                   <h2>组件标题</h2>
                   <p>组件内容</p>
                </div>`
   })
   ```

2. 注册组件

   ```javascript
   //2.注册组件
   Vue.component('my-component', cpnC)
   ```

3. 使用组件

   ```html
   <div id="app">
     <my-component></my-component>
   </div>
   ```

效果截图：![效果](C:%5CUsers%5C13536%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201226182053795.png)

---

## 全局组件

> 全局组件可以在多个Vue实例中使用，通过`Vue.component()`注册的组件为全局组件

---

## 局部组件

> 在Vue实例中注册的组件为局部组件，只能在注册的实例中进行使用，使用`components`来注册组件

```javascript
const cpnC = Vue.extend({
    template: `<div>
                  <h2>组件标题</h2>
                  <p>组件内容</p>
               </div>`
  })

const app = new Vue({
  el: '#app',
  components: {
    //组件名: 组件构造器名
    cpn: cpnC
  }
})
```

---

## 父子组件

> 如果想在组件中使用其它的组件，这两个组件就为父子关系。先创建子组件，然后再创建父组件，在父组件中使用`compoents`注册子组件就可以在`template`中使用子组件

```html
<div id="app">
  <cpn-father></cpn-father>
</div>

<script src="../js/vue.js"></script>
<script>
  //子组件
  const cpnChild = Vue.extend({
    template: `<div><h1>子组件标题</h1><p>子组件内容</p></div>`
  })

  //父组件
  const cpnFather = Vue.extend({
    //在父模板中使用子组件
    template: `<div>
                <h1>父组件标题</h1>
                <p>父组件内容</p>
                <cpn-child></cpn-child>
               </div>`,
    //在父组件中注册子组件
    components: {
      cpnChild
    }
  })

  const app = new Vue({
    el: '#app',
    components: {
      //注册父组件
      cpnFather
    }
  })
</script>
```

![效果](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201226191955.png)

---

## 注册组件的语法糖

```javascript
// 全局组件注册语法糖
Vue.component('cpn', {
  template: `<div><h1>组件标题</h1></div>`
})

//局部组件注册语法糖
const app = new Vue({
    el: '#app',
    components: {
      cpn: {
        template: `<div><h1>组件标题</h1></div>`
      }
    }
  })
```

---

## 组件模板的抽离

使用`<template>`标签并指定`id`进行对模板的抽离，注册组件时通过`id`指定模板

```html
<template id="myCpn">
  <div>
    <h1>组件标题</h1>
    <p>组件内容</p>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    components: {
      myCpn: {
        //通过id指定模板
        template: '#myCpn'
      }
    }
  })
```

---

## 组件中的数据

> 如果想要在组件中存放数据，应该使用`data()`函数精选存储，而不是`data`属性，让组件创建时保证数据的封闭。

```html
<template id="myTemplate">
  <div>
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    components: {
      myCpn: {
        template: '#myTemplate',
        //在组件中使用data()函数存放数据
        data() {
          return {
            title: "组件标题",
            content: "组件内容"
          }
        }
      }
    }
  })
</script>
```

---

## 组件的通信

> 父子组件通信需要使用两种方法，一个是使用`props`向子组件传递数据，另一个是通过==事件==向父组件发送消息。
>
> ![父子组件的通信](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201226204356.png)

### 父传子`props`

> 在子组件中使用`props`声明需要的变量，在使用组件时使用`v-bind`对参数进行绑定

```html
<div id="app">
  <!-- 通过v-bind将父组件与子组件中的变量进行绑定 -->
  <cpn v-bind:c-message="message" :c-movies="movies"></cpn>
</div>

<!-- 子组件模板 -->
<template id="myTemplate">
  <div>
    <h1>{{cMessage}}</h1>
    <ul>
      <li v-for="item in cMovies">{{item}}</li>
    </ul>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  //子组件
  const cpn = {
    template: '#myTemplate',
    //父传子声明变量
    props: ['cMovies', 'cMessage']
  }

  const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js',
      movies: ["《信条》", "《你的名字》", "《让子弹飞》", "《阿甘正传》", "《盗梦空间》"]
    },
    //注册子组件
    components: {
      cpn
    }
  })
</script>
```

在`props`中可以使用数组进行对变量的声明，也可以使用对象的形式对数据进行限制或默认值。

注意：数组类型或对象类型的默认值必须是一个`default()`函数

```javascript
props: {
      cMessage: {
        //类型
        type: String,
        //默认值
        default: "暂无数据",
        //必须传递，否则报错
        required: true
      },
      cMovies: {
        type: Array,
        //default函数指定默认值
        default() {
          return ['暂无数据']
        },
        required: true
      }
    }
```

---

### 子传父`$emit Events`

子组件通过`this.$emit('name', parms)`发送自定义事件，父组件通过`v-on`监听子组件发送的自定义事件来实现子组件向父组件通信的过程。

```html
<div id="app">
  <!-- 监听子组件发送的事件 -->
  <cpn @item-click="cpnClick"></cpn>
</div>

<template id="myTemplate">
  <div>
    <button v-for="item in categories"
            @click="btnClick(item)">{{item.name}}</button>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>

  //子组件
  const cpn = {
    template: '#myTemplate',
    methods: {
      btnClick(item) {
        //发送自定义事件
        this.$emit('item-click', item);
      }
    },
    data() {
      return {
        categories: [
          {id: '001', name: "热门推荐"},
          {id: '002', name: "手机数码"},
          {id: '003', name: "家用家电"},
          {id: '004', name: "电脑办公"},
        ]
      }
    }
  }

  const app = new Vue({
    el: '#app',
    methods: {
      cpnClick(item) {
        alert("你选择了：" + item.name);
      }
    },
    //注册子组件
    components: {
      cpn
    }
  })
</script>
```

---

### 父子组件双向绑定

实际上是通过子组件==向父组件发送事件==进而修改父组件中`data`中的数据

```html
<div id="app">
  <h1>父组件</h1>
  <p>num：{{num}}</p>
  <p>msg：{{msg}}</p>
  <hr>
  <!-- 绑定数据 并且 监听事件 -->
  <cpn :message="msg"
       @message-change="msgChange"></cpn>
</div>

<template id="myTemplate">
  <div>
    <h1>子组件</h1>
    <p>message：{{dataMessage}}</p>
    <input type="text" :value="dataMessage" @input="messageInput">
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      msg: "Hello world"
    },
    methods: {
      msgChange(value) {
        this.count = value;
      }
    },
    //子组件
    components: {
      cpn: {
        template: '#myTemplate',
        //父组件传输数据
        props: {
          message: String
        },
        //存储数据
        data() {
          return {
            dataMessage: this.message
          }
        },
        //事件
        methods: {
          messageInput(event) {
            //子组件的双向绑定
            this.dataMessage = event.target.value;
            //向父组件发送数据
            this.$emit('message-change', this.dataMessage);
          }
        }
      }
    }
  })
</script>
```

---

### 父子组件的直接获取

> 直接获取即在父组件或子组件中直接获取到子组件或父组件的对象，进而访问起属性和方法。

#### 父组件获取子组件

> 父组件可使用`$children`或`$refs`获取子组件。
>
> `this.$children`是一个数组，它包含了当前组件下所有的子组件，可通过遍历的形式获取需要的子组件。
>
> `this.$refs`是一个子组件对象，需要指定组件的`ref`，通过`$refs.xxx`获取对应的组件，从而不需要遍历

```html
<div id="app">
  <cpn></cpn>
  <button @click="btnClick">访问子组件</button>
</div>

<template id="myTemplate">
  <div>
    <h1>子组件</h1>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    methods: {
      btnClick() {
        //访问子组件的showMessage的方法
        this.$children[0].showMessage();
      }
    },
    //注册子组件
    components: {
      cpn: {
        template: '#myTemplate',
        data() {
          return{
            message: "Hello Vue.js"
          }
        },
        methods: {
          showMessage() {
            alert(this.message);
          }
        }
      }
    }
  })
</script>
```

使用`refs`

```html
<cpn ref="cpn"></cpn>
```

调用形式

```javascript
this.$refs.cpn.showMessage();
```

---

#### 子组件获取父组件

> 子组件可以使用`$parent`获取父组件。

```html
<body>
<div id="app">
  <cpn></cpn>
</div>

<template id="myTemplate">
  <div>
    <h1>子组件</h1>
    <button @click="btnClick">访问父组件</button>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js'
    },
    //注册子组件
    components: {
      cpn: {
        template: '#myTemplate',
        methods: {
          btnClick() {
            //访问父组件
            alert(this.$parent.message);
          }
        }
      }
    }
  })
</script>
```