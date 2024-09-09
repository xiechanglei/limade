# 发布说明

主要文件夹说明：
- lib：库代码，最后发布的代码
- src：开发代码，主要用于测试，不会发布

代码测试：
1. 本地测试：npm run dev，集成了vite,可以在src目录中编写测试代码

版本发布流程:
1. 编译代码：npm run build
2. 增加版本号,可以使用一下命令：npm version patch
3. 发布版本：npm publish 
