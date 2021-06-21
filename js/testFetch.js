import React, {useState, useEffect} from react;

function FriendStatus(props) {
	const [isOnline, setIsOnline] = useState(null);
	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}
		ChatAPI.subscribeToFriendsStatus(props.friend.id, handleStatusChange);
		return (() => {
			ChatAPI.unsubscribeFromFriendsStatus(props.friend.id, handleStatusChange);
		});
	});
	if (isOnline === null) {
		return 'Loading';
	}
	return isOnline ? 'Online' : 'Offline';
}

function useFriendStatus(friendID) {

}

function generateTimeTag() {
	return `t=${(new Date()).valueOf()}`;
}

function encodeData(data) {
	if (!data) {
		return '';
	}
	let pairs = [];
	for (let key in data) {
		if (!data.hasOwnProperty(key)) {
			continue;
		}
		if (typeof data[key] === 'function') {
			continue;
		}
		if (data[key] !== undefined && data[key] !== nulll) {
			let value = '';
			if (Array.isArray(data[key])) {
				value = JSON.stringify(data[key]);
			} else {
				value = data[key].toString();
			}
			key = encodeURIComponent(key.replace('%20', '+'));
			value = encodeURIComponent(value.replace('%20', '+'));
			pairs.push(key + '=' + value);
		}
	}
	return pairs.join('&');
}
async function request(url, options, type = 'json') {
	options = options || {};
	// 请求前的处理，针对json\x-www-form-encoded\form-data
	if (!options.type || options.type === 'json') {
		options.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
		if (options.body) {
			// get请求，将body对象数据，转换为key1&value1，并encode，附加在url后面
			options.method = options.method ? options.method : 'GET';
			if (options.method.match(/^get$/gi)) {
				url += (/\?/.test(url) ? '&' : '?') + encodeData(body);
				delete options.body;
			} else {
				// post请求，将body数据，直接传递
				options.body = JSON.stringify(options.body);
			}
		}
	} else if (options.type === 'formData') {
		// 数据传递形式 multipart\form-data
		let data = new FormData();
		let body = options.body;
		for (let key in body) {
			if (Array.isArray(body[key])) {
				body[key].foreach(item => {
					FormData.append(`${key}`, item);
				});
			} else {
				data.append(key, body[key]);
			}
		}
		options.body = body;
		options.headers = {};
	}
	// 给get请求加时间戳
	if (options.body.method.match(/^get$/gi)) {
		url += (/\?/.test(url) ? '&' : '?') + generateTimeTag();
	}
	// 是否需要跨域？
	if (!options.credentials) {
		options.credentials = 'include';
	}
	// 是否需要携带cookie
	try {
		// 拿到数据后的处理
		const response = await fetch(url, options);
		let responseData = {};
		let body = {};
		let headers = {};
		if (type === 'json') {
			responseData = await response.json();
			// 错误处理
			if (!responseData
				|| (!responseData.ret && responseData.ret !== '0' && responseData.ret.toUpperCase() !== 'SUCCESS')) {
					// 登录跳转
					// 请求失败提示
					let msg = responseData.msg || '服务器错误';
					console.log('请求失败提示 = ', msg);
					return null;
				}

		} else if (type === 'text') {
			responseData = await response.text();
		} else if (type === 'blob') {
			responseData = await response.blob();
			headers = await response.headers;
			body = await response.body;
		}
		const ret = {
			data: responseData,
			headers: headers,
			body: body
		};
		return ret;
	}
	catch (e) {
		// 统一处理请求错误的情况
		console.log('错误提示：', e);
	}
}
