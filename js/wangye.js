document.addEventListener('DOMContentLoaded', function() {
    // Parallax background effect
    const parallaxBg = document.getElementById('parallax-bg');
    const bgContainer = document.querySelector('.background-container');
    
    document.addEventListener('mousemove', (e) => {
        const rect = bgContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // 增加运动因子以获得更明显的效果
        const moveX = (xPercent - 50) * 0.08;
        const moveY = (yPercent - 50) * 0.08;
        
        if (parallaxBg) {
            // 添加平滑过渡效果
            parallaxBg.style.transition = 'transform 0.5s ease-out';
            parallaxBg.style.transform = `translate(${moveX}%, ${moveY}%)`;
            
            // 确保背景图像覆盖容器
            parallaxBg.style.backgroundSize = 'cover';
            parallaxBg.style.backgroundPosition = 'center';
        }
    });
    

    
    // 二维码弹窗
    //支付宝二维码
    const supportBtn = document.getElementById('support-btn');
    const qrModal = document.getElementById('qr-modal');
    
    supportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        qrModal.style.display = 'flex';
    });
    
    qrModal.addEventListener('click', () => {
        qrModal.style.display = 'none';
    });
    
    // 防止在点击内容内部时关闭模态框
    const modalContent = qrModal.querySelector('.modal-content');
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 为所有按钮添加鼠标移入移出效果
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // 为徽标添加悬停效果
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
});
