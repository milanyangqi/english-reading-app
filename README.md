# 英文阅读学习网站

这是一个自定义英文阅读学习网站，模仿图片中所示的英语学习排版设计。用户可以输入或粘贴英文文本，系统会自动为单词添加标注，包括发音、词性、释义等信息。

## 功能特点

- 自定义英文阅读内容
- 单词高亮显示
- 单词发音功能
- 单词释义和例句展示
- 词性标注
- 响应式设计，适配不同设备

## 技术栈

- React.js
- Axios (API请求)
- 免费词典API (DictionaryAPI.dev)
- React Icons
- CSS3 (自定义样式)

## 使用方法

### 本地开发

1. 克隆项目到本地
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm start`
4. 在浏览器中访问：`http://localhost:3000`

### Docker部署

#### 方法一：使用Docker Compose（推荐）

1. 克隆项目到服务器：
   ```bash
   git clone https://github.com/milanyangqi/english-reading-app.git
   cd english-reading-app
   ```

2. 使用Docker Compose构建并启动容器：
   ```bash
   docker-compose up -d
   ```

3. 在浏览器中访问：`http://服务器IP`

#### 方法二：使用Docker命令

1. 克隆项目到服务器：
   ```bash
   git clone https://github.com/milanyangqi/english-reading-app.git
   cd english-reading-app
   ```

2. 构建Docker镜像：
   ```bash
   docker build -t english-reading-app .
   ```

3. 运行Docker容器：
   ```bash
   docker run -d -p 80:80 --name english-reading-app english-reading-app
   ```

4. 在浏览器中访问：`http://服务器IP`

## 如何使用

1. 在文本输入框中输入或粘贴英文文本
2. 点击「生成阅读」按钮
3. 系统会自动为文本中的单词添加标注
4. 点击单词可以查看详细释义和发音
5. 点击发音图标可以听取单词发音

## 自定义设置

- 可以调整字体大小和行间距
- 可以选择是否显示音标
- 可以选择是否自动播放单词发音