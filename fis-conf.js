//ѹ��js ����
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define,bed,wx,weixin,jQuery,$'
    }
});

//�Զ�ȥ��console.log�ȵ�����Ϣ 
fis.config.set('settings.optimizer.uglify-js', {
    compress: {
        drop_console: true
    }
});

//������ļ�
fis.set('project.files', [
    '/js/main.js'
]);

//�����ļ�
fis.set('project.ignore', ['.git/**',
    '.svn/**']);


//�����Ϲ�����ļ����й��� ���� ��ת�Ƶ�releaseĿ¼ 

//����css�ļ�
// fis.match('/public/**.css', {
    // useHash: true,
    // optimizer: fis.plugin('clean-css'),
    // release: '/output/$0',
    // domain: 'http://www.shuiqian.cc'
// });

//less�ļ� ����
// fis.match('**.less', {
    // ���� release Ϊ FALSE�����ٲ������ļ�
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
  // isMod: true // ���ƥ���ļ�Ϊ���
// });


//��ҳindex.js ���hash uglify-js
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

// ��ҳindex.js ���hash uglify-js
// fis.match('/js/**.min.js', {
    // useHash: false,
    // optimizer: null,
    // release: '/output/$0',
    // domain: 'http://www.shuiqian.cc'
// });