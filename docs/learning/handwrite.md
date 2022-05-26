# N个手写JS

### 11.防抖
```js
const debounce=function(func,duration){
    let timeout=null;
    return function(){
        clearTimeout(timeout);
        timeout =setTimeout(()=>{
            func.apply(this,arguments);
        },duration)
    }
}
```

### 12.节流
```js
const throttle=(func,duration)=>{
    let flat=true;
    return function(){
        if(!flag) return;
        flag=false;
        setTimeout(()=>{
            fn.apply(this,arguments);
            flag=true;
        },duration)
    }
}
```

### 13.函数柯里化
```js

```

### 14. 模拟new操作
:::tip new操作的3个步骤
1. 以`constructor.prototype`为原型 创建一个对象
2. 执行构造函数并将`this`绑定到新创建的对象上
3. 判断构造函数返回结果是否是引用类型，否则返回新创建的对象
:::
```js
function newOperator(ctor,...args){
    if(typeof ctor!==='function'){
        throw new TypeError('TypeError');
    }
    const obj=Object.create(ctor.prototype);
    const res=ctor.apply(obj,args);
    if(
        (typeof res==='object' && res!==null)
        || typeof res==='function'
    ){
        return res;
    }
    return obj;
}
```

### 15.instanceOf
```js
const myInstanceOf=(left,right)=>{
    if(typeof right!==='object' || right===null){
        return false;
    }
    if(typeof left==='object' && left!==null){
        let proto=left.prototype;
        if(proto===null) return false;
        if(proto===right.prototype) return true;
        return myInstanceof(proto.prototype,right);
    }
    return false;
}
```

### 16.原型继承(组合继承)
```js
function Parent(){
    this.name='parent';
}
function Child(){
    Parent.call(this);
    this.type='childType';
}
Child.prototype=Object.Create(Parent.prototype);
Child.prototype.constructor=Child;
```

### 17.Object.is
```js
// +0 === -0 true
// NaN === NaN false
const is=(left,right)=>{
    if(left===right){
        return left!==0 || right!==0 || 1/left ===1/right;
    } else {
        return left!==left && right!==right;
    }
}
```

### 18.Object.assign
Object.assign方法用于将所有可枚举的属性值
从一个或多个源对象复制到目标对象
返回目标对象(浅拷贝)
```js
Object.defineProperty(Object,'assign',{
    value: function(target,...args){
        if(target === null){
            return new TypeError('cannot assign null');
        }
        const to=Object(target);
        for(let i=0;i<args.length;i++){
            const nextSource=args[i];
            if(nextSource!==null){
                for(const key in nextSource){
                    if(Object.prototype.hasOwnProperty.call(nextSource,key)){
                        to[key]=nextSource[key];
                    }
                }
            }
        }
        return to;
    },
    enumerable: false,// 不可枚举
    writable: true,
    configurable:true
})
```

### 19.深拷贝
```js
function cloneDeep(target,map=new WeakMap()){
    if(typeof target!=='object' || target===null){
        return target;
    }
    if(map.has(target)) return map.get(target);
    const cloned=Array.isArray(target)?:[]:{};
    map.set(target,cloned);
    const symbolKeys=Object.getOwnPropertySymbols(target);
    symbolKeys.forEach(key=>{
        if(typeof target[key] ==='object' && target[key]!==null){
            cloned[key]=cloneDeep(target[key]);
        }else{
            cloned[key]=target[key];
        }
    })
    for(const prop in target){
        if(Object.prototype.hasOwnProperty.call(target,prop)){
            const value=target[prop];
            if(typeof value==='object' && value!==null){
                cloned[prop]=cloneDeep(value,map);
            }else{
                cloned[prop]=target[prop]
            }
        }
    }
    return cloned;
}
```

