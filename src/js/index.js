// 在 webpack 中，一切皆模块，都可以通过 ES6 导入语法进行导入使用

// 如果某个模块中，使用 from 接收到的成员为 undefined ，则没必要进行接收

// 使用 ES6 语法，导入jQuery
import $ from "jquery"

// 导入 ico 图标
import ico from '@/ico/heart_rate.ico'

// 给 头部 link 标签的 href 动态赋值
$('#favicon').attr('href', ico)

// 导入样式
import '@/css/index.css'
import '@/css/index.less'

// 导入图片
// import float from '@/images/float.png'

// 给 img 标签的 src 动态赋值
// $('.img').attr('src', float)

// 导入音乐
import music from '@/music/周杰伦 - 蒲公英的约定.mp3'

// 给 audio 标签的 src 动态赋值
$('.music').attr('src', music)

// 定义装饰器函数
function info(target) {

	target.info = 'Person info.'

}

// 定义一个普通的类
@info

class Person {}

// console.log(Person.info)

// 定义一个异步函数
async function getAllData() {

	// 替换成你的Amap Web API Key
	const AmapWebApiKey = "2863ccd3a9e0df85433cf960ed3eaade"

	try {

		// 获取当前定位
		const ip_resp = await fetch(`https://restapi.amap.com/v3/ip?&key=${AmapWebApiKey}`)
		const ip_data = await ip_resp.json()
		const city = ip_data.city

		// 实时天气查询URL
		const amaprealweather_url =
			`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${AmapWebApiKey}&extensions=base`

		// 预报天气查询URL
		const amapforeweather_url =
			`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${AmapWebApiKey}&extensions=all`

		// 获取实时天气数据
		const amaprealweather_resp = await fetch(amaprealweather_url)
		const amaprealweather_data = await amaprealweather_resp.json()

		// 获取预报天气数据
		const amapforeweather_resp = await fetch(amapforeweather_url)
		const amapforeweather_data = await amapforeweather_resp.json()

		// 清除控制台上的旧数据
		console.clear()

		// 打印返回数据
		console.log("当前 ip data 查询")
		console.log(ip_data)
		console.log("高德地图 Web API 实时查询")
		console.log(amaprealweather_data)
		console.log("高德地图 Web API 预报查询")
		console.log(amapforeweather_data)

		// 将信息展示在页面中相应的位置

		// 温度
		$('.temp').html(`${Math.round(amaprealweather_data.lives[0].temperature)}℃`)

		// 天气状态

		// 获取 高德地图 Web API 实时查询 返回的weather值
		const weather = `${amaprealweather_data.lives[0].weather}`
		// 正则表达式来去掉/和-后面的内容，以及截取超过5个字的天气类型
		$('.type').html(weather.replace(/\/.*|-.*|（.*）|\(.*\)/g, '').trim().substring(0, 4))

		// 天气状态图片

		// 使用数组来存储不同的天气类型
		const clear = ["晴"]
		const clear_cloud = ["晴间多云"]
		const cloud = ["阴", "少云"]
		const cloudy = ["多云"]
		const light_rainy = ["雨", "毛毛雨/细雨", "小雨", "小雨-中雨"]
		const moderate_rainy = ["中雨", "中雨-大雨"]
		const heavy_rainy = ["大雨", "大雨-暴雨"]
		const intense_fall = ["暴雨", "暴雨-大暴雨", "阵雨"]
		const downpour = ["大暴雨", "大暴雨-特大暴雨"]
		const heavy_downpour = ["特大暴雨", "强阵雨"]
		const thundershower = ["雷阵雨", "强雷阵雨"]
		const thundershower_hail = ["雷阵雨并伴有冰雹"]
		const rainy_snow = ["雨雪天气", "雨夹雪", "阵雨夹雪"]
		const extreme_rainyfall = ["极端降雨"]
		const ice_rainy = ["冻雨"]
		const snow = ["雪"]
		const light_snow = ["小雪", "小雪-中雪"]
		const moderate_snow = ["中雪", "中雪-大雪"]
		const heavy_snow = ["大雪", "大雪-暴雪"]
		const blizzard = ["暴雪"]
		const snow_shower = ["阵雪"]
		const fog = ["雾", "轻雾", "大雾"]
		const heavy_fog = ["浓雾", "强浓雾", "特强浓雾"]
		const haze = ["霾"]
		const moderate_haze = ["中度霾"]
		const heavy_haze = ["重度霾"]
		const severity_haze = ["严重霾"]
		const floating_dust = ["浮尘"]
		const blowing_sand = ["扬沙"]
		const sandstorm = ["沙尘暴"]
		const heavy_sandstorm = ["强沙尘暴"]
		const tornado = ["龙卷风"]
		const breeze = ["有风", "平静"]
		const southeast_wind = ["微风", "和风", "清风"]
		const strong_breeze = ["强风/劲风", "疾风", "大风"]
		const hurricane = ["烈风", "风暴", "狂爆风", "飓风"]
		const tropical_storm = ["热带风暴"]
		const hot = ["热"]
		const cold = ["冷"]

		// 判断，与API返回的weather属性匹配，替换SVG标签中的href值，从而达到需求

		if (clear.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-qing')
		} else if (clear_cloud.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-duoyun')
		} else if (cloud.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-yin1')
		} else if (cloudy.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-yin')
		} else if (light_rainy.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-xiaoyu')
		} else if (moderate_rainy.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-zhongyu')
		} else if (heavy_rainy.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-dayu')
		} else if (intense_fall.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-baoyu')
		} else if (downpour.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-dabaoyu')
		} else if (heavy_downpour.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-tedabaoyu')
		} else if (thundershower.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-leizhenyu')
		} else if (thundershower_hail.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-leizhenyubanbingbao')
		} else if (rainy_snow.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-yujiaxue')
		} else if (extreme_rainyfall.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-jiduanjiangyu')
		} else if (ice_rainy.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-dongyu')
		} else if (snow.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-xue')
		} else if (light_snow.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-xiaoxue2')
		} else if (moderate_snow.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-zhongxue2')
		} else if (heavy_snow.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-daxue2')
		} else if (blizzard.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-baoxue2')
		} else if (snow_shower.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-zhenxue')
		} else if (fog.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-wu')
		} else if (heavy_fog.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-a-tianqiwu')
		} else if (haze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-mai')
		} else if (moderate_haze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-zhongdumai')
		} else if (heavy_haze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-zhongdumai1')
		} else if (severity_haze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-yanzhongmai')
		} else if (floating_dust.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-fuchen')
		} else if (blowing_sand.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-yangsha')
		} else if (sandstorm.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-a-shachenbao1')
		} else if (heavy_sandstorm.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-a-qiangshachenbao1')
		} else if (tornado.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-longjuanfeng')
		} else if (breeze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-weifeng')
		} else if (southeast_wind.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-ruofeng')
		} else if (strong_breeze.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-qiangfeng')
		} else if (hurricane.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-a-jufengredaifengbao')
		} else if (tropical_storm.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-redaifengbao')
		} else if (hot.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-re')
		} else if (cold.includes(weather)) {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-a-re1')
		} else {
			$('.weatherImg').find('use').attr('xlink:href', '#icon-weizhi')
		}

		// 地区
		$('.area').html(`${city}`.replace(/市(.*)$/, '')) // 正则表达式来去除市字和之后的所有字符

		// 获取temperature
		const temperature = Math.round(amaprealweather_data.lives[0].temperature)
		// 高温
		$('#gaowen').html(
			`${Math.round(amapforeweather_data.forecasts[0].casts[0].daytemp) >= temperature ? Math.round(amapforeweather_data.forecasts[0].casts[0].daytemp) : temperature}℃`
		)
		// 低温
		$('#diwen').html(
			`${Math.round(amapforeweather_data.forecasts[0].casts[0].nighttemp) <= temperature ? Math.round(amapforeweather_data.forecasts[0].casts[0].nighttemp) : temperature}℃`
		)

		// 感温
		$('#ganwen').html(`${Math.round(amaprealweather_data.lives[0].temperature)}℃`)

		// 湿度
		$('#shidu').html(`${Math.round(amaprealweather_data.lives[0].humidity)}%`)

		// 风向
		$('#fengxiang').html(`${amaprealweather_data.lives[0].winddirection}`)

		// 风力
		$('#fengli').html(`${amaprealweather_data.lives[0].windpower}级`)

	} catch (error) {
		console.error(error)
	}

}

function playing() {

	// 设置audio初始音量
	$('#music')[0].volume = 0.8

	// 点击图片实现播放音乐或不播放音乐和实现图片一直旋转或停止旋转
	var playing = false

	// 注册点击事件
	$('#rotate').click(function() {
		if (!playing) {
			// 播放
			$('#music')[0].play()
			// 旋转
			playing = true
			$('#rotate').css('animation', 'rotation 4s linear infinite')
		} else {
			// 不播放
			$('#music')[0].pause()
			// 不旋转
			playing = false
			$('#rotate').css('-webkit-animation-play-state', 'paused')
		}
	})

	// 添加audio对play事件的监听器
	$('#music').on('play', function() {
		playing = true
		$('#rotate').css('animation', 'rotation 4s linear infinite')
	})

	// 添加audio对pause事件的监听器
	$('#music').on('pause', function() {
		playing = false
		$('#rotate').css('-webkit-animation-play-state', 'paused')
	})
}

window.onload = function() {
	// 页面加载完后调用函数
	getAllData()
	playing()
}

// 每隔10分钟更新一次页面内容
setInterval(getAllData, 10 * 60 * 1000)