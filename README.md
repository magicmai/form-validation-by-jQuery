# jQuery表单验证设计

在这个实例中，比起熟练 jQuery 操作，更多地了解到了程序设计的思路，分模块编写代码，可以更高效地进行维护，阅读上也能降低一些难度。

## 过程：

**1.是什么，怎么做：**
- 制作网站注册界面（表单内容包括姓名、用户名、年龄、密码和自我介绍等）
- 对用户每次输入的内容进行有效性验证（ `blur事件` ）：
    - 姓名：  必填，验证字符长度，2~8个字符
    - 用户名：必填，验证字符长度，4~16个字符
    - 年龄：  必填，验证数字大小，>=18
    - 密码:   必填，验证字符长度，6~16个字符
    - 自我介绍：非必填，验证字符长度，最多1024个字符
* 输入无效内容时，向用户显示 告知输入规则的信息，让用户知道输入内容有误
- 点击“注册”按钮后，提示用户是否注册成功：
    - 注册失败：`alert("invalid")` 提示
    - 注册成功：`alert("注册成功")` 提示（demo中只做到这一步，实际中一般会跳转到登陆后显示的页面）

**2.用到的技术：**
- html
- css
- JavaScript
- jQuery

**3.页面结构**

**[index.html](https://github.com/magicmai/form-validation-by-jQuery/blob/master/index.html)**

外部文件：

css：`normalize.css`、`main.css`

js：`jquery.js`、`validator.js`、`input.js`、`main.js`

**4.程序设计**
利用 html5 新添加的自定义属性 `data-*` ，把验证规则作为字符串存储在 `input` 标签的 `data-rule` 属性中，例如：
```
<input data-rule="minlength:2|maxlength:8" type="text" name="name">
```

模块化思想：让负责不同功能的函数在不同的 js 文件中，再一并作为依赖添加到 html 文件中，demo中共有三个需要编写的 js 文件：
- main.js
- input.js
- validator.js

**[validator.js](https://github.com/magicmai/form-validation-by-jQuery/blob/master/js/validator.js)：**

Validator构造函数，检测输入合法性：is_valid()

**[input.js](https://github.com/magicmai/form-validation-by-jQuery/blob/master/js/input.js)：**

Input构造函数，参数：selector
过程：
1. 通过传入的参数 `selector` 获取 `input` 元素中用户输入的值 （`val`）
2. 获取输入错误时负责给用户提示信息的 （`div`） 元素
3. 转换 `data-rule` 属性的字符串值为对象 （`rule`）
4. 新建检测函数的实例，传入用户输入的值和存储验证规则的对象 （`val` 和 `rule`）：`new Validator(val, rule)`
5. 监听 `input` 输入框中值的变化，判断合法性

**[main.js](https://github.com/magicmai/form-validation-by-jQuery/blob/master/js/main.js)：**

1. 选中页面中所有的 `input[data-rule]` 元素
2. 解析每一个 `input` 的验证规则
3. 验证


**5.测试与调试**
用户在输入框中输入内容后再删除，并且焦点离开输入框，此时是否仍然会显示错误提示？

修改 `validator.js` 文件中 new_val 的取值方式：

```php
// 原（当 new_val 为空时 val 等于了上一个 val 值）：
val = new_val || val;

// 改为（只有new_val为非空值时才赋值给 val）：
if (new_val !== 'undefined') {
    val = new_val;
}
```

**6.完善样式**

**[main.css](https://github.com/magicmai/form-validation-by-jQuery/blob/master/css/main.css)**
