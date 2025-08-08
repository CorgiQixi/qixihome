// 设置问候语
function setGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting-text');
    
    if (hour >= 5 && hour < 9) {
        greetingEl.textContent = '清晨好';
    } else if (hour >= 9 && hour < 12) {
        greetingEl.textContent = '上午好';
    } else if (hour >= 12 && hour < 14) {
        greetingEl.textContent = '中午好';
    } else if (hour >= 14 && hour < 18) {
        greetingEl.textContent = '下午好';
    } else if (hour >= 18 && hour < 23) {
        greetingEl.textContent = '晚上好';
    } else {
        greetingEl.textContent = '夜深了';
    }
}

// 加载卡片数据
async function loadCards() {
    const container = document.getElementById('cards-container');
    
    try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 实际项目中应使用真实路径
        const response = await fetch('cards.json');
        
        if (!response.ok) {
            throw new Error('无法加载数据');
        }
        
        const cards = await response.json();
        
        // 移除加载状态
        container.innerHTML = '';
        
        // 检查卡片数据是否为空
        if (!cards || cards.length === 0) {
            showErrorMessage('没有找到卡片数据');
            return;
        }
        
        // 渲染卡片
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            
            // 根据是否有背景图设置不同样式
            if (card.image) {
                cardElement.className = 'card image-bg';
                cardElement.style.backgroundImage = `url('${card.image}')`;
            } else {
                cardElement.className = 'card glass';
            }
            
            cardElement.innerHTML = `
                <div class="card-content-inner">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-content">${card.introduce}</p>
                </div>
            `;
            
            // 点击卡片跳转
            cardElement.addEventListener('click', () => {
                window.location.href = card.url;
            });
            
            container.appendChild(cardElement);
        });
        
    } catch (error) {
        console.error('加载卡片失败:', error);
        showErrorMessage('加载内容失败，请稍后再试');
    }
}

// 显示错误信息
function showErrorMessage(message) {
    const container = document.getElementById('cards-container');
    container.innerHTML = `
        <div class="error-container">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p class="error-message">${message}</p>
        </div>
    `;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    loadCards();
});