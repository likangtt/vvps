# VPS优惠站 - VPS Deals Site

一个现代化的VPS优惠信息展示网站，采用科技风暗色主题设计，支持中英文双语切换。

## 🚀 功能特性

### 前端功能
- **响应式设计**: 完美适配桌面端和移动端
- **科技风UI**: 暗色主题，炫光效果，高对比度设计
- **国际化支持**: 支持中文和英文双语切换
- **优惠展示**: 卡片式展示VPS优惠信息
- **智能筛选**: 支持按标签、地区、服务商筛选
- **Markdown支持**: 优惠详情支持Markdown格式

### 管理功能
- **管理员面板**: 简洁易用的后台管理界面
- **优惠管理**: 添加、编辑、删除优惠信息
- **实时预览**: Markdown编辑器支持实时预览
- **数据统计**: 优惠数量、热门推荐等统计信息
- **标签管理**: 灵活的标签系统

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + 自定义CSS动画
- **图标**: Lucide React
- **Markdown**: react-markdown + remark-gfm
- **语言**: TypeScript
- **国际化**: 自定义i18n解决方案

## 📦 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
npm start
```

## 🎨 项目结构

```
├── app/                    # Next.js App Router
│   ├── admin/             # 管理员面板
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── admin/            # 管理员组件
│   ├── Header.tsx        # 头部导航
│   ├── Hero.tsx          # 首页横幅
│   ├── DealsGrid.tsx     # 优惠网格
│   ├── DealCard.tsx      # 优惠卡片
│   └── ...
├── lib/                  # 工具库
│   ├── i18n.ts          # 国际化配置
│   └── i18n-context.tsx # 国际化上下文
├── data/                # 数据文件
│   └── deals.json       # 优惠数据
└── public/              # 静态资源
```

## 🌐 国际化

项目支持多语言切换：

- **英文 (en-US)**: 默认语言
- **中文 (zh-CN)**: 简体中文界面
- **日语 (ja-JP)**: 日语界面
- **印地语 (hi-IN)**: 印地语界面
- **葡萄牙语 (pt-BR)**: 葡萄牙语界面
- **西班牙语 (es-ES)**: 西班牙语界面

语言设置会自动保存到localStorage，下次访问时会记住用户的选择。

## 🔧 配置说明

### 管理员登录
- 默认密码: `admin123`
- 可在 `app/admin/layout.tsx` 中修改

### 数据存储
- 优惠数据存储在 `data/deals.json`
- 支持JSON格式的数据管理
- 可扩展为数据库存储

### 样式定制
- 主题色彩在 `tailwind.config.js` 中配置
- 自定义动画在 `app/globals.css` 中定义
- 支持暗色主题和炫光效果

## 📱 响应式设计

- **桌面端**: 完整功能，多列布局
- **平板端**: 自适应布局，触控优化
- **移动端**: 单列布局，移动端导航

## 🎯 SEO优化

- 语义化HTML结构
- Meta标签优化
- 结构化数据支持
- 移动端友好

## 🚀 部署建议

### Vercel (推荐)
```bash
npm run build
# 部署到Vercel
```

### 传统服务器
```bash
npm run build
npm start
```

### Docker部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔮 未来计划

- [ ] 数据库集成 (PostgreSQL/MySQL)
- [ ] 用户系统和评论功能
- [ ] RSS订阅功能
- [ ] 邮件通知系统
- [ ] 更多语言支持
- [ ] PWA支持
- [ ] 暗色/亮色主题切换

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**Made with ❤️ by CodeBuddy**