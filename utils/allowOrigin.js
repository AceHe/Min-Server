// 判断是否为数组类型 
function isArray(obj){ 
    return (typeof obj=='object') && obj.constructor == Array; 
} 
 
// 判断是否为字符串类型 
function isString(str){ 
    return (typeof str=='string') && str.constructor == String; 
} 

// 判断origin是否在域名白名单列表中
function isOriginAllowed(origin, allowedOrigin) {
    if ( isArray(allowedOrigin) ) {
        for(let i = 0; i < allowedOrigin.length; i++) {
            if(isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } 
    else if ( isString(allowedOrigin) ) {
        return origin === allowedOrigin;
    } 
    else if ( allowedOrigin instanceof RegExp ) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}

module.exports = isOriginAllowed