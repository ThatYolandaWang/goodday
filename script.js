/**
 * 每日祝福页面脚本
 * 功能：根据访问用户的IP所在地区和当前时间，生成个性化祝福语并配上好看的图片
 */

function blessingApp() {
    return {
        locationInfo: '正在获取您的位置...',
        currentDate: '',
        greeting: '您好',
        blessing: '正在为您生成祝福...',
        englishBlessing: 'Generating blessing for you...',
        backgroundImage: '',
        region: '',
        city: '',
        country: '',
        countryCode: '',
        language: 'zh-CN',
        isEnglishCountry: false,
        weatherCondition: '',
        season: '',
        
        // 页面加载时初始化
        init() {
            this.updateDateTime();
            this.fetchLocationInfo();
            this.loadRandomBackground();
            
            // 每分钟更新一次时间
            setInterval(() => this.updateDateTime(), ENV_CONFIG.AUTO_REFRESH_INTERVAL);
        },
        
        // 更新日期和时间
        updateDateTime() {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                weekday: 'long' 
            };
            this.currentDate = now.toLocaleDateString(ENV_CONFIG.DEFAULT_LANGUAGE, options);
            
            // 根据时间更新问候语
            const hour = now.getHours();
            if (hour >= 5 && hour < 12) {
                this.greeting = '早上好';
                this.englishGreeting = 'Good Morning';
            } else if (hour >= 12 && hour < 14) {
                this.greeting = '中午好';
                this.englishGreeting = 'Good Afternoon';
            } else if (hour >= 14 && hour < 18) {
                this.greeting = '下午好';
                this.englishGreeting = 'Good Afternoon';
            } else if (hour >= 18 && hour < 22) {
                this.greeting = '晚上好';
                this.englishGreeting = 'Good Evening';
            } else {
                this.greeting = '夜深了';
                this.englishGreeting = 'It\'s Late Night';
            }
            
            // 确定季节
            const month = now.getMonth() + 1;
            if (month >= 3 && month <= 5) {
                this.season = 'spring';
            } else if (month >= 6 && month <= 8) {
                this.season = 'summer';
            } else if (month >= 9 && month <= 11) {
                this.season = 'autumn';
            } else {
                this.season = 'winter';
            }
            
            document.body.className = `theme-${this.season}`;
        },
        
        // 获取位置信息
        async fetchLocationInfo() {
            try {
                // 使用环境配置中的API密钥
                const response = await fetch(`https://ipinfo.io/json?token=${ENV_CONFIG.IPINFO_TOKEN}`);
                if (!response.ok) throw new Error('获取位置信息失败');
                
                const data = await response.json();
                this.region = data.region || '未知地区';
                this.city = data.city || '未知城市';
                this.country = data.country || '';
                this.countryCode = data.country || 'CN';
                this.locationInfo = `${this.region}${this.city}`;
                
                // 判断是否是英语国家
                const englishCountries = ['US', 'GB', 'CA', 'AU', 'NZ', 'IE'];
                this.isEnglishCountry = englishCountries.includes(this.countryCode);
                
                // 设置语言
                if (this.isEnglishCountry) {
                    this.language = 'en-US';
                } else {
                    // 根据国家代码设置语言
                    this.setLanguageByCountry(this.countryCode);
                }
                
                // 生成位置相关的祝福语
                this.generateBlessing();
                
            } catch (error) {
                console.error('获取位置信息出错:', error);
                this.locationInfo = '未知位置';
                this.generateBlessing(); // 即使没有位置信息也生成祝福语
            }
        },
        
        // 根据国家代码设置语言
        setLanguageByCountry(countryCode) {
            const languageMap = {
                'CN': 'zh-CN',
                'TW': 'zh-TW',
                'HK': 'zh-HK',
                'JP': 'ja-JP',
                'KR': 'ko-KR',
                'DE': 'de-DE',
                'FR': 'fr-FR',
                'ES': 'es-ES',
                'IT': 'it-IT',
                'RU': 'ru-RU',
                // 默认为中文
                'default': 'zh-CN'
            };
            
            this.language = languageMap[countryCode] || languageMap['default'];
        },
        
        // 生成祝福语
        generateBlessing() {
            // 根据时间、季节和位置生成祝福语
            const hourBlessings = {
                morning: [
                    '愿这清晨的阳光为您带来活力与希望',
                    '新的一天，新的开始，愿您充满能量',
                    '晨光熹微，愿您的一天从美好开始'
                ],
                noon: [
                    '午时已到，记得小憩片刻，善待自己',
                    '忙碌的一天需要适当休息，愿您午餐愉快',
                    '阳光正好，万物并育，愿您中午好胃口'
                ],
                afternoon: [
                    '下午时光总是安静美好，愿您度过惬意时光',
                    '午后时光，适合品茶思考，愿您心情愉悦',
                    '日渐西沉，愿您的工作顺利收尾'
                ],
                evening: [
                    '华灯初上，愿您的夜晚温馨浪漫',
                    '繁星点点，愿您有个美好的夜晚',
                    '城市华灯璀璨，愿您的夜晚充满温暖'
                ],
                night: [
                    '夜深了，愿您有个甜美的梦乡',
                    '星河璀璨，愿您梦中有温柔相伴',
                    '静谧的夜晚，正是休息的好时光，晚安'
                ]
            };
            
            const seasonBlessings = {
                spring: [
                    '春暖花开，万物复苏，愿您的心情如春天般明媚',
                    '春风拂面，好似情人的手，愿您感受春天的温柔',
                    '春意盎然，新绿遍野，愿您的生活充满希望'
                ],
                summer: [
                    '骄阳似火，热情如你，愿您的夏日激情四射',
                    '夏日炎炎，冰饮消暑，愿您清凉一夏',
                    '夏花绚烂，如火如荼，愿您的生活同样热烈精彩'
                ],
                autumn: [
                    '秋高气爽，丹桂飘香，愿您的生活步步高升',
                    '秋叶飘落，岁月静好，愿您悟得人生真谛',
                    '金秋送爽，硕果累累，愿您收获满满'
                ],
                winter: [
                    '冬日暖阳，温暖如你，愿您的冬日不再寒冷',
                    '瑞雪纷飞，平安喜乐，愿您的冬天充满温馨',
                    '冰天雪地，暖意融融，愿您冬日里有热茶相伴'
                ]
            };
            
            // 英文版祝福语
            const hourBlessingsEnglish = {
                morning: [
                    'May the morning sunshine bring you vitality and hope',
                    'A new day, a new beginning, may you be full of energy',
                    'Dawn is breaking, may your day start beautifully'
                ],
                noon: [
                    'It\'s noon, remember to take a short break and be kind to yourself',
                    'A busy day needs proper rest, enjoy your lunch',
                    'The sun is just right, may you have a good appetite at noon'
                ],
                afternoon: [
                    'The afternoon is always quiet and beautiful, may you spend a pleasant time',
                    'Afternoon is perfect for tea and thinking, may you be in a good mood',
                    'As the sun sets, may your work end smoothly'
                ],
                evening: [
                    'As the lights come on, may your evening be warm and romantic',
                    'Stars are twinkling, have a wonderful night',
                    'City lights are shining, may your night be full of warmth'
                ],
                night: [
                    'It\'s late, may you have a sweet dream',
                    'The galaxy is bright, may tenderness accompany you in your dreams',
                    'The quiet night is the perfect time to rest, good night'
                ]
            };
            
            const seasonBlessingsEnglish = {
                spring: [
                    'Spring is here with flowers blooming, may your mood be as bright as spring',
                    'Spring breeze feels like a lover\'s touch, may you feel the gentleness of spring',
                    'Spring is in the air, and greenery is everywhere, may your life be full of hope'
                ],
                summer: [
                    'The sun is blazing, passionate like you, may your summer be vibrant',
                    'Summer heat calls for cold drinks, may you have a cool summer',
                    'Summer flowers are blooming vigorously, may your life be equally colorful'
                ],
                autumn: [
                    'Clear autumn skies and fragrant osmanthus, may your life continue to rise',
                    'Falling autumn leaves, peaceful times, may you understand the truth of life',
                    'Cool autumn breezes, abundant harvests, may you reap plentifully'
                ],
                winter: [
                    'Winter sunshine, warm like you, may your winter not be cold',
                    'Snow is falling, peace and joy, may your winter be filled with warmth',
                    'Ice and snow outside, warmth inside, may you have hot tea to accompany you in winter'
                ]
            };
            
            // 确定时间段
            const hour = new Date().getHours();
            let timeKey;
            if (hour >= 5 && hour < 12) {
                timeKey = 'morning';
            } else if (hour >= 12 && hour < 14) {
                timeKey = 'noon';
            } else if (hour >= 14 && hour < 18) {
                timeKey = 'afternoon';
            } else if (hour >= 18 && hour < 22) {
                timeKey = 'evening';
            } else {
                timeKey = 'night';
            }
            
            // 随机选择祝福语
            const hourBlessing = hourBlessings[timeKey][Math.floor(Math.random() * hourBlessings[timeKey].length)];
            const seasonBlessing = seasonBlessings[this.season][Math.floor(Math.random() * seasonBlessings[this.season].length)];
            
            // 随机选择英文祝福语
            const hourBlessingEnglish = hourBlessingsEnglish[timeKey][Math.floor(Math.random() * hourBlessingsEnglish[timeKey].length)];
            const seasonBlessingEnglish = seasonBlessingsEnglish[this.season][Math.floor(Math.random() * seasonBlessingsEnglish[this.season].length)];
            
            // 如果有位置信息，增加位置相关祝福
            let locationBlessing = '';
            let locationBlessingEnglish = '';
            
            if (this.city && this.city !== '未知城市') {
                const locationBlessings = [
                    `${this.city}的每一天都值得珍惜，愿您今日愉快`,
                    `身在${this.city}，心向远方，愿您心想事成`,
                    `${this.city}的风景应该很美，就像您的心情一样`
                ];
                
                const locationBlessingsEnglish = [
                    `Every day in ${this.city} is worth cherishing, I wish you a pleasant day`,
                    `Being in ${this.city}, with your heart towards the distance, may your wishes come true`,
                    `The scenery in ${this.city} must be beautiful, just like your mood`
                ];
                
                const idx = Math.floor(Math.random() * locationBlessings.length);
                locationBlessing = locationBlessings[idx];
                locationBlessingEnglish = locationBlessingsEnglish[idx];
            }
            
            // 随机选择组合方式
            const random = Math.random();
            if (random < 0.33) {
                this.blessing = `${hourBlessing}。${seasonBlessing}。`;
                this.englishBlessing = `${hourBlessingEnglish}. ${seasonBlessingEnglish}.`;
            } else if (random < 0.66) {
                this.blessing = `${seasonBlessing}。${hourBlessing}。`;
                this.englishBlessing = `${seasonBlessingEnglish}. ${hourBlessingEnglish}.`;
            } else if (locationBlessing) {
                this.blessing = `${locationBlessing}。${hourBlessing}。`;
                this.englishBlessing = `${locationBlessingEnglish}. ${hourBlessingEnglish}.`;
            } else {
                this.blessing = `${hourBlessing}。祝您今日平安喜乐。`;
                this.englishBlessing = `${hourBlessingEnglish}. Wish you peace and joy today.`;
            }
        },
        
        // 加载随机背景图片
        async loadRandomBackground() {
            try {
                // 获取适合年轻人口味的图片
                const keywords = [
                    'street+style+modern', 
                    'urban+exploration', 
                    'minimalist+landscape', 
                    'aesthetic+photography'
                ];
                const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
                
                // 使用季节关键词+随机关键词，获取更相关的图片
                const seasonKeyword = this.season || 'nature';
                const searchQuery = `${seasonKeyword}+${randomKeyword}`;
                const orientation = ENV_CONFIG.IMAGE_ORIENTATION || 'landscape';
                
                // 使用环境配置中的API密钥
                const url = `https://api.unsplash.com/photos/random?query=${searchQuery}&orientation=${orientation}&client_id=${ENV_CONFIG.UNSPLASH_API_KEY}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('获取图片失败');
                
                const data = await response.json();
                this.backgroundImage = data.urls.regular;
                
                // 预加载图片
                const img = new Image();
                img.src = this.backgroundImage;
                
                // 向HTML添加图片创作者的信息
                const credit = document.createElement('div');
                credit.className = 'photo-credit';
                credit.innerHTML = `Photo by <a href="${data.user.links.html}?utm_source=daily_blessing&utm_medium=referral" target="_blank">${data.user.name}</a> on <a href="https://unsplash.com/?utm_source=daily_blessing&utm_medium=referral" target="_blank">Unsplash</a>`;
                document.body.appendChild(credit);
                
            } catch (error) {
                console.error('加载背景图片出错:', error);
                
                // 在API失败时使用备用图片
                if (ENV_CONFIG.USE_BACKUP_IMAGE) {
                    this.useBackupImage();
                }
            }
        },
        
        // 使用备用图片
        useBackupImage() {
            // 备用图片集合
            const backupImages = [
                'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
                'https://images.unsplash.com/photo-1501854140801-50d01698950b',
                'https://images.unsplash.com/photo-1496449903678-68ddcb189a24',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
                'https://images.unsplash.com/photo-1583591900414-7031eb309cb6'
            ];
            
            // 随机选择一张备用图片
            const randomIndex = Math.floor(Math.random() * backupImages.length);
            this.backgroundImage = backupImages[randomIndex];
        },
        
        // 更换背景图片
        changeBackground() {
            this.loadRandomBackground();
        },
        
        // 分享祝福
        shareBlessing() {
            let shareText;
            
            // 根据是否是英语国家决定分享的文本
            if (this.isEnglishCountry) {
                shareText = `${this.englishGreeting}! ${this.englishBlessing}`;
            } else {
                shareText = `${this.greeting}！${this.blessing}\n\n${this.englishGreeting}! ${this.englishBlessing}`;
            }
            
            if (navigator.share) {
                navigator.share({
                    title: '每日祝福 | Daily Blessing',
                    text: shareText,
                    url: window.location.href
                })
                .then(() => console.log('分享成功'))
                .catch((error) => console.log('分享失败', error));
            } else {
                // 复制到剪贴板
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                alert('祝福语已复制到剪贴板！');
            }
        }
    };
}

// 添加页面加载完成后的初始化
document.addEventListener('alpine:init', () => {
    // Alpine.js 初始化完成
}); 