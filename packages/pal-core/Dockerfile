# 阶段1：编译
FROM node:20-alpine as builder

# 设置工作目录
WORKDIR /usr/src/pt-auto-login

# 复制代码到容器里
COPY . .

# 安装项目依赖
RUN npm install -g pnpm  \
  && pnpm install \
  && pnpm run build

# 阶段2：复制构建产物并创建定时任务
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/pt-auto-login

COPY --from=builder /usr/src/pt-auto-login/dist /usr/src/pt-auto-login/package.docker.json ./

RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata \
  && mv ./package.docker.json ./package.json \
  && npm install \
  && echo "0 10 0 * * cd /usr/src/pt-auto-login && node ./src/index.js >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# 运行Cron
CMD ["crond", "-f"]
