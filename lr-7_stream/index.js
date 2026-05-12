const fs = require('fs');
const path = require('path');

// Задания 1, 2 и 3: Чтение, буфер и поиск
async function processReadStream(searchWord) {
    const filePath = path.join(__dirname, 'input.txt');
    let chunkCount = 0;

    const readStream = fs.createReadStream(filePath, { 
        highWaterMark: 512 // Задание 2: Размер чанка 512 байт [cite: 64]
    });

    // Задание 1: Событийная модель [cite: 62, 63]
    readStream.on('open', () => console.log('Файл открыт для чтения.'));

    readStream.on('data', (chunk) => {
        chunkCount++;
        console.log(`Получен чанк №${chunkCount}, размер: ${chunk.length} байт.`);

        // Задание 3: Поиск данных [cite: 66, 67]
        const content = chunk.toString();
        const index = content.indexOf(searchWord);
        
        if (index !== -1) {
            console.log(`Слово "${searchWord}" найдено! Индекс в чанке: ${index}.`);
            console.log('Пауза 3 секунды...');
            readStream.pause(); // Ставим на паузу 
            setTimeout(() => {
                readStream.resume(); // Возобновляем 
                console.log('Поток возобновлен.');
            }, 3000);
        }
    });

    readStream.on('end', () => {
        console.log('Чтение завершено.');
        console.log(`Всего чанков потребовалось: ${chunkCount}.`); // [cite: 65]
    });
}

// Задание 4: Запись с дозаписью [cite: 68]
async function appendToFile() {
    const writeStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
    
    writeStream.write(`Дата: ${new Date().toLocaleString()}\n`); // Текущая дата [cite: 69]
    writeStream.write('Строка лога 1\n');
    writeStream.write('Строка лога 2\n');
    writeStream.write('Строка лога 3\n');
    
    writeStream.end();
    console.log('Данные дописаны в файл.');
}

// Задание 5: Трубопровод (Pipe) [cite: 70]
async function copyFilePipe() {
    const src = fs.createReadStream(path.join(__dirname, 'source.txt'));
    const dest = fs.createWriteStream(path.join(__dirname, 'destination.txt'));

    // Одна строка кода для копирования [cite: 70]
    src.pipe(dest).on('finish', () => console.log('Готово')); // [cite: 71]
}