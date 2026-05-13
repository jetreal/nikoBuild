// Скрипт для сжатия больших JPG изображений
// Использование: node compress-images.js

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, 'app', 'images');

const imagesToCompress = [
    { 
        file: 'SAM_0122.jpg', 
        width: 1920,  // достаточно для фонового изображения
        quality: 75 
    },
    { 
        file: 'SAM_0810.jpg', 
        width: 1400,  // соответствует width: 1400px в CSS
        quality: 75 
    }
];

async function compressImages() {
    for (const img of imagesToCompress) {
        const inputPath = path.join(imagesDir, img.file);
        const outputDir = path.join(imagesDir, 'compressed');
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPath = path.join(outputDir, img.file);
        
        try {
            console.log(`Сжатие ${img.file}...`);
            
            const metadata = await sharp(inputPath).metadata();
            console.log(`  Исходный размер: ${metadata.width}x${metadata.height}`);
            
            await sharp(inputPath)
                .resize({ 
                    width: img.width,
                    withoutEnlargement: true 
                })
                .jpeg({ 
                    quality: img.quality,
                    progressive: true,
                    mozjpeg: true
                })
                .toFile(outputPath);
            
            const originalSize = fs.statSync(inputPath).size;
            const compressedSize = fs.statSync(outputPath).size;
            const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);
            
            console.log(`  Сжатый размер: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  Экономия: ${savings}%`);
            console.log(`  Сохранено в: ${outputPath}`);
            console.log('');
            
        } catch (error) {
            console.error(`Ошибка сжатия ${img.file}:`, error.message);
        }
    }
    
    console.log('Готово! Теперь замените оригинальные файлы на сжатые из папки compressed/');
}

compressImages();
