function judgeType(change) {
    if (arguments.length == 0) {
        return '0';//无参数传入
    }
    if (change === null) {
        return 'null'
    }
    if (change === undefined && arguments.length > 0) {
        return 'undefined'
    }
    if (change instanceof Function) {
        return 'function'
    }
    if (change instanceof Array) {
        return 'arry'
    }
    if (change instanceof Number || typeof change == 'number') {
        return 'number'
    }
    if (change instanceof String || typeof change == 'string') {
        return 'string'
    }
    if (change instanceof Boolean || typeof change == 'boolean') {
        return 'boolean'
    }
}

/**
 * 总结的其他方法；
 * https://www.cnblogs.com/onepixel/p/5126046.html
 */