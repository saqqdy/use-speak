import type { RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import alias, { type ResolverObject } from '@rollup/plugin-alias'
import filesize from 'rollup-plugin-filesize'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from '../package.json' assert { type: 'json' }
import { banner, extensions, reporter } from './config'

const externals = [...Object.keys(pkg.dependencies || {})]
const nodeResolver = nodeResolve({
	// Use the `package.json` "browser" field
	browser: false,
	extensions,
	preferBuiltins: true,
	exportConditions: ['node'],
	moduleDirectories: ['node_modules']
})
const iifeGlobals = {
	vue: 'VueDemi',
	'vue-demi': 'VueDemi',
	'core-js': 'coreJs'
}

const options: RollupOptions = {
	plugins: [
		alias({
			customResolver: nodeResolver as ResolverObject,
			entries: [
				// {
				//     find: /^#lib(.+)$/,
				//     replacement: resolve(__dirname, '..', 'src', '$1.mjs')
				// }
			]
		}),
		nodeResolver,
		commonjs({
			sourceMap: false,
			exclude: ['core-js']
		}),
		typescript({
			compilerOptions: {
				outDir: undefined,
				declaration: false,
				declarationDir: undefined,
				target: 'es5'
			}
		}),
		babel({
			babelHelpers: 'bundled',
			extensions,
			exclude: ['node_modules']
		}),
		cleanup({
			comments: 'all'
		}),
		filesize({ reporter }),
		visualizer()
	]
}

const distDir = (path: string) =>
	process.env.BABEL_ENV === 'es5' ? path.replace('index', 'index.es5') : path

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: distDir(pkg.main),
				exports: 'auto',
				format: 'cjs',
				banner
			},
			{
				file: distDir(pkg.module),
				exports: 'auto',
				format: 'es',
				banner
			}
		],
		external(id: string) {
			return ['core-js'].concat(externals).some(k => new RegExp('^' + k).test(id))
		},
		...options
	},
	{
		// input: 'src/index.ts',
		input: distDir('dist/index.mjs'),
		output: [
			{
				file: distDir('dist/index.iife.js'),
				format: 'iife',
				name: 'useSpeak',
				extend: true,
				globals: iifeGlobals,
				banner
			},
			{
				file: distDir(pkg.unpkg),
				format: 'iife',
				name: 'useSpeak',
				extend: true,
				globals: iifeGlobals,
				banner,
				plugins: [terser()]
			}
		],
		external(id: string) {
			return ['vue', 'vue-demi'].some(k => new RegExp('^' + k).test(id))
		},
		plugins: [
			nodeResolver,
			commonjs({
				sourceMap: false,
				exclude: ['core-js']
			}),
			cleanup({
				comments: 'all'
			}),
			filesize({ reporter }),
			visualizer()
		]
	}
]
