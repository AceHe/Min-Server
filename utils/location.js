// 根据ip定位
// http://ip.taobao.com/service/getIpInfo2.php ip=""
// https://www.maxmind.com/geoip/v2.1/city/61.148.149.145?demo=1
function locationIP(data) {
	if( data == 'err' ) return '外星人👽';
	var info = JSON.parse( data );
	var country = info.country.names['zh-CN'];
	var subdivisions = info.subdivisions ? info.subdivisions[0].names['zh-CN'] +'-' : '';
	var city = info.city.names['zh-CN'];
	addr = country +'-'+ subdivisions + city;
	return addr;
}

module.exports = locationIP;
