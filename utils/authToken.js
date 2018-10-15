function authToken( data ) {
	if( data === global.tokenInfo && data !== undefined ){
		return true;
	}else {
		return false;
	}
}

// 验证token
module.exports = authToken