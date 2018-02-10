'use strict'

// 上节中写 type 函数时，用来存放 toString 映射结果的对象
var class2type = {}

// 相当于 Object.prototype.toString
var toString = class2type.toString

// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty

function isPlainObject(obj) {
  var proto, Ctor

  // 排除掉明显不是obj的以及一些宿主对象如Window
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj)

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
}

export default function extend() {
  // 默认不进行深拷贝
  var deep = false

  var name, options, src, copy, clone, copyIsArray
  // 获取参数的个数
  var length = arguments.length
  var i = 1
  // 第一个参数不传布尔类型的时候，target就是默认的第一个参数
  var target = arguments[0] || {}
  // 第一个参数是布尔类型，第二个参数是target
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为 {}
  if ((typeof target !== 'object' && typeof target !== 'function') || target === null) {
    target = {}
  }

  for (; i < length; ++i) {
    // 获取当前对象
    options = arguments[i]
    // 要求不能为空，避免出现extend(a,,b)
    if (options != null) {
      for (name in options) {
        // 目标属性
        src = target[name]
        // 要复制的属性
        copy = options[name]
        // 解决循环引用
        if (target === copy) {
          continue
        }
        // 要递归的对象必须是plainobject 或者数组
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          // 要复制的对象属性值类型与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
