const path = require('path') // 导入 Node.js 中操作路径的模块

const HtmlPlugin = require('html-webpack-plugin') // 导入 html-webpack-plugin 插件，得到插件的构造函数

const htmlPlugin = new HtmlPlugin({ // new 构造函数,创建插件的实例对象

	template: './src/index.html', // 指定原文件的存放路径

	filename: './index.html', // 指定生成的文件的存放路径

})

const { // 打包发布时自动清理 dist 目录下的旧文件

	CleanWebpackPlugin // 解构赋值

} = require('clean-webpack-plugin')

module.exports = { // 使用 Node.js 中的导出语法，向外导出一个 webpack 的配置对象

	devtool: 'nosources-source-map', // 只定位具体报错的行数，点击链接时，不会暴露源码

	mode: 'development', // webpack 的运行模式，可选值有两个 development 和 production

	entry: [ // 打包入口文件的路径

		path.join(__dirname, './src/js/index.js'),
		path.join(__dirname, './src/js/iconfont.js')

	],

	output: {

		path: path.join(__dirname, './dist'), // 输出文件的存放路径

		filename: 'js/main.js', // 输出文件的名称

	},

	plugins: [htmlPlugin, new CleanWebpackPlugin()], // 通过 plugin 节点，使 htmlPlugin 插件生效

	devServer: {

		open: true, // 初次打包完成后，自动打开浏览器

		host: '127.0.0.1', // 实时打包所使用的主机地址

		port: 80 // 实时打包所使用的端口号，在 http 协议中，如果端口号是 80 ，则可以被省略

	},

	module: { // 所有第三方模块的匹配规则

		rules: [ // 定义不同模块对应的 loader ，从后往前

			{
				test: /\.css$/, // 处理 css 文件
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/, // 处理 less 文件
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.ico$/, // 处理 ico 文件
				use: ['url-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/, // 处理 图片 文件
				use: ['url-loader?limit=22229&outputPath=images'] // 只有 <=limit 大小的图片，才会被转为 base64 格式的图片
			},
			{
				test: /\.(mp3|ogg|flac|wav|mid)$/, // 处理 音频 文件
				use: ['file-loader?outputPath=music']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理 fonts 字体
				use: ['file-loader?outputPath=fonts']
			},
			{
				test: /\.js$/, // 处理 高级 JS 文件
				use: 'babel-loader', // 注意，必须使用 exclude 指定排除项，因为 node_modules 目录下的第三方不需要被打包
				exclude: /node_modules/ // 因为第三方包中的 JS 兼容性，不需要关心
			}
		]

	},

	resolve: {

		alias: {

			'@': path.join(__dirname, './src/') // 告诉 webpack ，@ 符号代表 src 这一层源代码目录 （ @ 表示从外往里找 ）

		}

	}

}