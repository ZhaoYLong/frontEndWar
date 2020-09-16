class Promise {
    constructor (executor) {
        // 默认状态是等待状态
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];
        let resolve = (data) => {
            // this指的是实例
            if (this.status === 'pending'){
                this.value = data;
                this.status = "resolved";
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if(this.status === 'pending'){
                this.reason = reason;
                this.status = 'rejected';
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try{
            // 执行时可能会发生异常
            executor(resolve, reject);
        } catch(e) {
            reject(e); // promise失败
        }
    }

    then(onFuilFilled, onRejected){
        // 防止值的穿透
        onFuilFilled = typeof onFuilFilled === 'function' ? onFuilFilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err;}
        let promise2; // 作为下一次then方法的promise
        if (this.status === 'resolved') {
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try{
                        let x = onFuilFilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e);
                    }
                }, 0)
            });
        }
        if(this.status === 'rejected'){
            promise2 = new Promise((resolve,reject) => {
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                },0)

            });
       }
       //当前既没有完成也没有失败
       if(this.status === 'pending'){
            promise2 = new Promise((resolve,reject) => {
                //把成功的函数一个个存放到成功回调函数数组中
                this.onResolvedCallbacks.push( () =>{
                    setTimeout(() => {
                        try{
                            let x = onFuiFilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                });
                //把失败的函数一个个存放到失败回调函数数组中
                this.onRejectedCallbacks.push( ()=>{
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                })
            })
        }
        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
            
}