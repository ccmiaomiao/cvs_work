# maybeicouldgetawork

### 嘛。。。这个工程，炫技中还要带着实用，着实掉了几根头发，还劳烦 boss 们花点时间审阅下

#### 工期大概在 2 + 3 + 5(h)。。。emmm。。。。

##### 噗，白色的报表看腻歪了，看看黑色的咋样

###### OKOK，视力测试完毕， 以下正题开始

### 限制条件

#### 目前只考虑在 chrome 中使用~

### 依赖

[![vue](https://img.shields.io/badge/vue-^2.6.11-green.svg 'vue')](https://cn.vuejs.org/index.html)
[![core-js](https://img.shields.io/badge/corejs-^3.6.5-green.svg 'core-js')](https://github.com/zloirock/core-js)
[![element-ui](https://img.shields.io/badge/elementui-^2.13.2-green.svg 'element-ui')](https://element.eleme.cn/)
[![echarts](https://img.shields.io/badge/echarts-^4.8.0-green.svg 'echarts')](https://echarts.cdn.apache.org/)

### 技术点

```
vue // 小型团队专用
    // 要是复杂点儿的多人场景，我个人更推荐angular，毕竟ts亲爹微软也参与到了angular中，各种意义上，中大型团队用强类型会更好点儿啦
    // 并且各种零件都是由模块的形式，组织更加清晰
    // PS：react是OK的，某些场景下的确也是性能更好，然鹅作为写了快10年html的人，至今觉得jsx写起来不带感
web worker // 现在的excel很小，加载无感知么，但是如果数量到3M 30M 300M，浏览器会停摆的，于是把数据的解析丢到别的线程去干吧，起码保证主线程可活动（loading---我还能转。。。）
```

### 开发思路

```
0.界面要好看，布局要合理，这样才有人用不是

1.两张报表，有各自的表头（properties）,各自的数据
  先用FileReader读成string，然后做字符串的处理获取数据吧
  读取的过程中cvs要是够大，单线程小水管一定会堵塞，GPU都没有运行空间的那种，于是塞到别的线程跑加载吧
2.数据的整理阶段，把数据的类型表匹配到数据表上，完成数据关联
3.数据的初步展示使用element-ui，关联上table组件，添加排序（如果数据量够大还要考虑分页，嘛，目前先完全展示吧）
4.关于数据的整理，在多次反复展示数据的场景下，尽可能的在获取数据的同时就完成相关数据的绑定，并且尽可能的使用栈内存，而减少使用堆
5.另外除了首次加载的数据之后，后续的数据可能不可信，需要进行空值校验，并给出提示
6.安全性上考虑，还要对输入进行xss处理，防止脚本或sql注入
```

## 关于拓展

### 如果有 electron 的环境

#### 可以使用文件管理器进行文件的读取存储，甚至自定义格式，进行组装后数据的包装保存

#### node 的环境可以几乎无限制的深入，毕竟可以直接读 C++，这个时候可以借助到更加高效的解析方式，或者拆分文件分步骤解析

### 同时也可以做出部分 fallback，回退到网页版本使用基本能力

#### [某 3d 在线模型编辑器](http://heimimiao.wang/editor) - 就是一个既可以右上角下载 exe 安装到本地使用，又可以在网页使用，以两种不同的存储方式存在的离线编辑器

### 1.通过表格拓展图表，给用户更加直观的感受

### 2.在浏览器端，在资源占用比较多的情况下，还可以考虑下PWA，工具的相关文件缓存起来，再次启动就起飞啦

### 3.数据加载了一次之后，下次进来还要重新读可能很烦，然鹅storage吧，又可能不够大，indexDB在chrome下最大能到2G的空间，小小表单轻松拿下。

