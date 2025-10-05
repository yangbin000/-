const fs = require('fs');
const path = require('path');

// 配置参数
const config = {
  totalEpisodes: 23,
  videoDir: 'C:/Users/86177/Desktop/yirendongman/video/咒术回战',
  outputDir: './',
  outputFilePrefix: '咒术回战_',
  fileExtension: '.html'
};

// 创建三级页面模板
function createTemplate() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>咒术回战 第{{episode}}集</title>
    <link rel="stylesheet" href="../css/wangye.css">
    <style>
        .video-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        video { width: 100%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .video-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; }
        .play-btn { background-color: #ffb6c1; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; }
        .episodes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-top: 20px; }
        .episode-btn { background-color: #ffb6c1; color: white; border: none; padding: 8px 15px; margin: 5px; border-radius: 20px; cursor: pointer; }
        .current-episode { background-color: #ff6b8b; font-weight: bold; }
    </style>
</head>
<body>
    <div class="background-container">
        <div class="background" id="parallax-bg">
            <img src="../img-t/background.png" alt="Background">
        </div>
    </div>
    
    <div class="content-overlay">
        <nav class="container">
            <div class="logo-container">
                <img src="../img-t/logo.png" style="width: 100px; height: 100px;" alt="Logo" class="logo">
            </div>
            <div class="nav-right">
                <button type="button" class="support-btn" id="support-btn"><strong>支持我们</strong></button>
            </div>
        </nav>
        
        <main class="video-container">
            <h1>咒术回战 第{{episode}}集</h1>
            <video id="anime-video" controls>
                <source src="{{videoPath}}" type="video/mp4">
            </video>
            
            <div class="episodes-section">
                <h2>剧集列表</h2>
                <div class="episodes-grid">
                    {{episodeButtons}}
                </div>
            </div>
        </main>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('anime-video');
            const episodeBtns = document.querySelectorAll('.episode-btn');
            
            // 高亮当前集数
            episodeBtns.forEach(btn => {
                if(btn.textContent.includes('第{{episode}}集')) {
                    btn.classList.add('current-episode');
                }
                
                btn.addEventListener('click', function() {
                    const episodeNum = this.textContent.match(/\\d+/)[0];
                    window.location.href = \`咒术回战_\${episodeNum}.html\`;
                });
            });
        });
    </script>
</body>
</html>`;
}

// 生成剧集按钮HTML
function generateEpisodeButtons(totalEpisodes, currentEpisode) {
  let buttons = '';
  for (let i = 1; i <= totalEpisodes; i++) {
    buttons += `<button class="episode-btn">第${i}集</button>\n`;
  }
  return buttons;
}

// 生成所有三级页面
function generateAllPages() {
  const template = createTemplate();
  
  for (let i = 1; i <= config.totalEpisodes; i++) {
    const videoPath = path.join(config.videoDir, `${i}-咒术回战第二季.mp4`);
    const episodeButtons = generateEpisodeButtons(config.totalEpisodes, i);
    
    const pageContent = template
      .replace(/\{\{episode\}\}/g, i)
      .replace('{{videoPath}}', videoPath.replace(/\\/g, '/'))
      .replace('{{episodeButtons}}', episodeButtons);
    
    const outputPath = path.join(config.outputDir, `${config.outputFilePrefix}${i}${config.fileExtension}`);
    fs.writeFileSync(outputPath, pageContent);
    console.log(`已生成: ${outputPath}`);
  }
}

// 执行生成
generateAllPages();
console.log('所有咒术回战三级页面生成完成！');
