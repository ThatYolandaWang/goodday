/**
 * 配置文件示例 - 存储API密钥和其他配置信息
 * 使用说明：复制此文件并重命名为config.js，然后填入您的API密钥
 * 注意：在生产环境中，应该使用环境变量或后端服务来保护API密钥
 */

const CONFIG = {
    // API密钥 - 请替换为您自己的密钥
    IPINFO_TOKEN: '您的IPINFO_TOKEN',
    UNSPLASH_API_KEY: '您的UNSPLASH_API_KEY',
    
    // 其他配置选项
    DEFAULT_LANGUAGE: 'zh-CN',
    AUTO_REFRESH_INTERVAL: 60000, // 时间刷新间隔（毫秒）
    IMAGE_ORIENTATION: 'landscape',
    USE_BACKUP_IMAGE: true // 在主要图片源失败时使用备用源
}; 