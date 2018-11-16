// 获取客户端 IP
function getClientIp(req) {
    var data = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

	var ip = data.match(/\d+.\d+.\d+.\d+/);
	ip = ip ? ip.join('.') : null;

    return ip
};

module.exports = getClientIp;