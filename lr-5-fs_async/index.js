const fs = require('fs/promises'); // Используем fs.promises
const path = require('path');

// Задание 1: Создание структуры
async function setup() {
    const storagePath = path.join(__dirname, 'storage');
    const statusFile = path.join(storagePath, 'status.txt');
    try {
        // Создаем папку, если её нет
        await fs.mkdir(storagePath, { recursive: true });
        // Записываем строку
        await fs.writeFile(statusFile, 'Система готова');
        console.log('Задание 1: Папка storage и файл status.txt созданы.');
    } catch (error) {
        console.error('Ошибка в Задании 1:', error.message);
    }
}

// Задание 2: Асинхронное чтение
async function readTasks() {
    const tasksPath = path.join(__dirname, 'tasks.txt');
    try {
        const data = await fs.readFile(tasksPath, 'utf8');
        // Выводим в верхнем регистре
        console.log('Задание 2 (содержимое):', data.toUpperCase());
    } catch (error) {
        // Если файла нет, выводим сообщение, не роняя программу
        if (error.code === 'ENOENT') {
            console.log('Задание 2: Файл задач не найден');
        } else {
            console.error('Ошибка в Задании 2:', error.message);
        }
    }
}

// Задание 3: Логирование с меткой времени
async function addLog(message) {
    const logPath = path.join(__dirname, 'storage', 'activity.log');
    const timestamp = new Date().toISOString();
    try {
        // Дописываем в файл
        await fs.appendFile(logPath, `[${timestamp}] ${message}\n`);
        console.log('Задание 3: Лог успешно добавлен.');
    } catch (error) {
        console.error('Ошибка в Задании 3:', error.message);
    }
}

// Задание 4: Цепочка операций
async function processFiles() {
    const sourcePath = path.join(__dirname, 'source.txt');
    const copyPath = path.join(__dirname, 'copy.txt');
    try {
        // Читаем оригинал
        const data = await fs.readFile(sourcePath);
        // Создаем копию
        await fs.writeFile(copyPath, data);
        // Удаляем оригинал
        await fs.unlink(sourcePath);
        console.log('Задание 4: Файл скопирован и оригинал удален.');
    } catch (error) {
        console.error('Ошибка в Задании 4:', error.message);
    }
}

// Задание 5: Параллельная проверка (Promise.all)
async function checkFilesExistence(fileNames) {
    try {
        // Массив промисов проверок
        const checks = fileNames.map(fileName => {
            const filePath = path.join(__dirname, fileName);
            return fs.access(filePath)
                .then(() => `${fileName}: Существует`)
                .catch(() => `${fileName}: Не существует`);
        });
        
        // Ожидаем выполнения всех проверок
        const results = await Promise.all(checks);
        console.log('Задание 5 (Результаты проверок):');
        results.forEach(result => console.log(result));
    } catch (error) {
        console.error('Ошибка в Задании 5:', error.message);
    }
}

// Пример вызова всех функций
/*
(async () => {
    await setup();
    await readTasks();
    await addLog("Тестовое сообщение");
    await processFiles();
    await checkFilesExistence(['tasks.txt', 'source.txt', 'copy.txt', 'missing.txt']);
})();
*/