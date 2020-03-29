const validator=(target:any, validator: any, obj:any)=>{
  return new Proxy(target, {
       set(target, key, value, proxy) {
          let va = validator[key](value);
          if (va.result) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw new Error(va.msg);
            return target[key] = false
          }
       }
   })
}

export {validator}