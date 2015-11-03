//压缩js 配置
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define,bed,wx,weixin,jQuery,$'
    }
});

//自动去除console.log等调试信息 
fis.config.set('settings.optimizer.uglify-js', {
    compress: {
        drop_console: true
    }
});

//编译的文件
fis.set('project.files', [
    '/js/main.js'
]);

//忽略文件
fis.set('project.ignore', ['.git/**',
    '.svn/**']);


//将符合规则的文件进行过滤 编译 并转移到release目录 

//所有css文件
// fis.match('/public/**.css', {
    // useHash: true,
    // optimizer: fis.plugin('clean-css'),
    // release: '/output/$0',
    // domain: 'http://www.shuiqian.cc'
// });

//less文件 忽略
// fis.match('**.less', {
    // 设置 release 为 FALSE，不再产出此文件
    // release: false
// });

// fis.hook('module');
// fis.hook('module', {
	// mode: 'amd',
	// baseUrl: '//mtest.shuiqian.cc/public/sharing/v2/js',
	// paths: {
		// bedtime: './config/bedtime',
		// wx: '//res.wx.qq.com/open/js/jweixin-1.0.0',
		// base64:'./thirdparty/base64.min',
		// template:'./thirdparty/template-native'
	// },
	// shim: {
		// 'base64': {
			// exports: 'Base64'
		// }
	// }
// });
// fis.match('/js/control/**.js', {
  // isMod: true // 标记匹配文件为组件
// });


//首页index.js 添加hash uglify-js
fis.match('/js/**.js', {
    useHash: true,
    optimizer: fis.plugin('uglify-js'),
    release: './$0',
	rExt: '.min.js',
    domain: 'http://www.shuiqian.cc'
});

fis.match('*.js', {
    useHash: true
});

// 首页index.js 添加hash uglify-js
// fis.match('/js/**.min.js', {
    // useHash: false,
    // optimizer: null,
    // release: '/output/$0',
    // domain: 'http://www.shuiqian.cc'
// });