# PT AUTO LOGIN

PT Auto Login（简称PAL），是一个批量登录 PT 站点的自动化脚本。

目前很多 PT 站点都有在一定时间内登录过页面的要求，也有很多站点有每日签到得魔力的活动，通过定时任务执行 PAL 或者将 PAL 运行在 docker 里之后，可以实现定时登录 PT 站点，以达到自动签到得魔力和保证登录活跃度的目的。

## 开始使用

支持有多种使用方式，支持手动编译运行以及通过 docker 自动执行。

### 方式一：本地手动编译执行

#### 步骤 1：安装环境并下载或拉取仓库代码

* 安装 node 环境，并且 node 版本 ≥ 17.5，推荐使用 20.11.0 以上版本（因为我的开发环境是 20.11.0），使用 `node -v` 确认版本
* 推荐使用 `pnpm`，后续操作都基于 `pnpm` 进行，安装：`npm install -g pnpm`
* 如：`git clone https://github.com/Jortana/PT-Auto-Login.git`

#### 步骤 2：准备配置文件

* 将位于 `./packages/pal-core/config/` 的 `site.example.json` 文件重命名为 `site.json`
* 修改 `site.json` 的内容，`site.json` 是一个配置数组，其中每一个元素都是一个网站的配置。
  * name 字段是网站名称，用于展示
  * url 字段是需要登录的站点的 url，可以是网站首页、签到得魔力页面地址等
  * cookie 字段是对应网站的 cookie，可以在登录状态下，按 `F12` 打开开发者工具，在 `Application -> Cookies` 下查看。或 `Network` 里选取一条网络请求查看。

#### 步骤 3：编译并运行

* `pnpm install`
* `pnpm build:core`
* `pnpm start:core`

### 方式二：利用 Docker 容器定时运行（推荐）

#### 步骤 1：准备配置文件和日志文件

* 新建一个配置文件，用于配置需要登录的站点，如 `touch config.json`
  * 内容可以参考项目里的 `site.example.json`
  * name 字段是网站名称，用于展示
  * url 字段是需要登录的站点的 url，可以是网站首页、签到得魔力页面地址等
  * cookie 字段是对应网站的 cookie，可以在登录状态下，按 `F12` 打开开发者工具，在 `Application -> Cookies` 下查看。或 `Network` 里选取一条网络请求查看。
* 新建一个日志文件，用于查看定时任务运行的日志，如 `touch pal.log`

#### 步骤 2：拉取镜像并运行

* `docker pull roryjyl/pt-auto-login`
* `docker run -d -v config.json:/usr/src/pt-auto-login/config/config.json -v pal.log:/var/log/cron.log roryjyl/pt-auto-login`
