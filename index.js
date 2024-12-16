const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// CORS 설정
app.use(cors());
app.use(express.json());

// 정적 파일 제공 (images 폴더 포함)
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public'))); // 필요한 다른 폴더도 포함

// 루트 경로에서 HTML 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// HTML 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 사다리 타기 API
app.post('/ladder', (req, res) => {
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1); // 1~20
    const results = [...numbers]; // 결과 배열

    // 13번은 자기 자신과 매칭
    const fixed = 13;
    results[fixed - 1] = fixed;

    // 나머지 번호 랜덤 섞기
    const remainingNumbers = numbers.filter(n => n !== fixed);
    const shuffled = remainingNumbers.sort(() => Math.random() - 0.5);

    let index = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] !== fixed) {
            results[i] = shuffled[index++];
        }
    }

    res.json({ results });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});
