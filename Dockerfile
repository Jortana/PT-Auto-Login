# 阶段1：编译
FROM node:20-alpine as builder

# 设置工作目录
WORKDIR /usr/src/pt-auto-login

# 复制代码到容器里
COPY . .

# 安装项目依赖
RUN npm install -g pnpm  \
  && pnpm install \
  && pnpm run build:core

# 阶段2：复制构建产物并创建定时任务
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/pt-auto-login

COPY --from=builder /usr/src/pt-auto-login/packages/pal-core/dist /usr/src/pt-auto-login/packages/pal-core/package.docker.json /usr/src/pt-auto-login/pm2.json ./pal-core/

RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata \
  && mkdir /var/log/pal-core \
  && touch /var/log/pal-core/outerr.log \
  && touch /var/log/pal-core/out.log \
  && touch /var/log/pal-core/err.log \
  && npm install pm2 -g \
  && mv ./package.docker.json ./package.json \
  && npm install 

# 运行Cron
CMD ["pm2-runtime", "pm2.json"]
