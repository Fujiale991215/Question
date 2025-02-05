import { resolve } from "path";

module.exports = {
    devServer: {
        port: 3000, // 设置开发服务器端口
        proxy: {
            '/my-app': {
                // target: 'http://localhost:2476',
                target: 'http://8.217.54.128:2476',
                changeOrigin: true,
                pathRewrite: {
                    '^/my-app': ''
                },
            }
        },
        client: {
            overlay: false, // 隐藏错误信息
            progress: true, // 显示编译进度
            reconnect: 5, // 断开连接后自动重连
        },
        open: {
            app: {
                name: 'google-chrome', // 打开指定浏览器
            },
        },
    },
    entry: './src/index.js', // 从相对路径开始  
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist') // 使用 __dirname 确保输出路径正确  
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 将 '@' 别名指向 'src' 目录  
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
};

export { };
// craco.config.ts