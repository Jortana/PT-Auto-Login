# 阶段1：编译
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/pt-auto-login

# 复制代码到容器里
COPY . .

# 安装项目依赖
RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata \
  && mkdir /var/log/pal-core \
  && touch /var/log/pal-core/outerr.log \
  && touch /var/log/pal-core/out.log \
  && touch /var/log/pal-core/err.log \
  && npm install -g pnpm pm2 \
  && pnpm install \
  && pnpm run build:core

# 运行Cron
CMD ["pm2-runtime", "pm2.json"]
