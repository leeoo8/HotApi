import { serve } from "@hono/node-server";
import { config } from "./config.js";
import logger from "./utils/logger.js";
import app from "./app.js";

// 启动服务器
const serveHotApi: (port?: number) => void = (port: number = config.PORT) => {
  try {
    const apiServer = serve({
      fetch: app.fetch,
      port,
      hostname: "0.0.0.0", // 确保监听所有主机地址
    });
    logger.info(`🔥 DailyHot API 成功在端口 ${port} 上运行`);
    logger.info(`🔗 可访问地址: http://0.0.0.0:${port}`);
    return apiServer;
  } catch (error) {
    logger.error(`❌ 服务启动失败: ${error}`);
  }
};

// 检查环境并启动服务器
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "docker" ||
  process.env.NODE_ENV === "production"
) {
  const port = parseInt(process.env.PORT || `${config.PORT}`, 10); // 优先使用环境变量 PORT
  serveHotApi(port);
}

export default serveHotApi;
