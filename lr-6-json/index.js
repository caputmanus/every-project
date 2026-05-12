const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, 'books.json');

// Вспомогательная функция для чтения данных
async function readBooks() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Задание 1. Инициализация
async function initLibrary() {
    try {
        try {
            await fs.access(FILE_PATH);
            console.log('Файл books.json уже существует.');
        } catch {
            await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2));
            console.log('Файл books.json успешно создан с пустым массивом.');
        }
    } catch (error) {
        console.error('Ошибка при инициализации:', error.message);
    }
}

// Задание 2. Добавление
async function addBook(title, author, year) {
    try {
        const books = await readBooks();
        const newBook = {
            id: Date.now(), // Генерируем уникальный ID
            title,
            author,
            year,
            isIssued: false // По умолчанию книга не выдана
        };
        books.push(newBook);
        await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
        console.log(`Книга "${title}" добавлена.`);
    } catch (error) {
        console.error('Ошибка при добавлении книги:', error.message);
    }
}

// Задание 3. Поиск
async function findBooksByAuthor(author) {
    try {
        const books = await readBooks();
        const authorBooks = books.filter(book => book.author === author);
        console.log(`Книги автора ${author}:`, authorBooks);
    } catch (error) {
        console.error('Ошибка при поиске книг:', error.message);
    }
}

// Задание 4. Обновление
async function issueBook(id) {
    try {
        const books = await readBooks();
        let found = false;
        const updatedBooks = books.map(book => {
            if (book.id === id) {
                found = true;
                return { ...book, isIssued: true };
            }
            return book;
        });

        if (found) {
            await fs.writeFile(FILE_PATH, JSON.stringify(updatedBooks, null, 2));
            console.log(`Статус книги с ID ${id} изменен на "выдана".`);
        } else {
            console.log(`Книга с ID ${id} не найдена.`);
        }
    } catch (error) {
        console.error('Ошибка при выдаче книги:', error.message);
    }
}

// Задание 5. Удаление
async function deleteOldBooks(currentYear) {
    try {
        const books = await readBooks();
        const filteredBooks = books.filter(book => (currentYear - book.year) <= 50);
        
        await fs.writeFile(FILE_PATH, JSON.stringify(filteredBooks, null, 2));
        console.log('Книги старше 50 лет успешно удалены.');
    } catch (error) {
        console.error('Ошибка при удалении старых книг:', error.message);
    }
}