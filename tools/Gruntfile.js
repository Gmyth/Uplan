module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		transport:{  
			options: {
				paths: ['../src/js'],
				debug: false
			},
			files: {
				"expand"   : true, 
				"cwd"      : '../src/js/',
				"src"      : ['lib/**/*','util/**/*','widget/**/*','page/**/*.js','net/**/*'],
				"dest"     : '../dest/js/'
			}
		},
		concat:{
			lib:{
				src:['../dest/js/lib/~.js','../dest/js/util/~.js','../dest/js/widget/~.js'],
				dest:'../dest/js/lib.js'
			},
			business:{
				src:['../dest/js/net/~.js'],
				dest:'../dest/js/business.js'
			},
			page :{
				src:['../dest/js/page/~.js'],
				dest:'../dest/js/page.js'
			}
		},
		copy:{
			tpl:{
				expand: true,
				cwd:  '../src/js/',
				src:['**/*.tpl'],
				dest:'../dest/js/'
			},
			css:{
				expand: true,
				cwd:  '../src/css/',
				src:['**/*'],
				dest:'../dest/css/'
			},
			img:{
				expand: true,
				cwd:  '../src/img/',
				src:['**/*'],
				dest:'../dest/img/'
			},
			html:{
				expand: true,
				cwd:  '../src/html/index/',
				src:['**/*'],
				dest:'../dest/'
			},
			seajs:{
				files:[
					{ "src": "../src/js/sea.js" , "dest": "../dest/js/sea.js"},
					{ "src": "../src/js/sea-config.js" , "dest": "../dest/js/sea-config.js"}
				]
			}
		},
		watch:{
			files:[
				'../src/js/lib/~.js','../src/js/util/~.js','../src/js/widget/~.js',
                '../src/js/net/~.js','../src/js/page/~.js','../src/js/~.tpl','../src/html/index/~.html',
				'../src/css/css/~.css','../src/css/~.css'
            ],
			tasks:['transport','copy:tpl','concat',"copy:css","copy:img","copy:html","copy:seajs"]
		},
		yuidoc: {
		    compile: {
		      name: '<%= pkg.name %>',
		      description: '<%= pkg.description %>',
		      version: '<%= pkg.version %>',
		      options: {
		        paths: ['nmc'],
		        themedir: 'docs/themes/default',
		        outdir: 'docs/app/'
		      }
		    }
		},
		mocha: {
			all: {
			  src: ['test/index.html'],
			  options: {
			    run: true
			  }
			}
		}
	});
	grunt.loadNpmTasks('grunt-qc-concat');
	grunt.loadNpmTasks('grunt-qc-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-cmd-transport');

    grunt.registerTask('default',['transport','copy:tpl','concat',"copy:css","copy:img","copy:html","copy:seajs","watch"]);
    grunt.registerTask('test',['mocha:all']);
    grunt.registerTask('doc',['yuidoc']);
};
