"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const cv_service_1 = require("../cv/cv.service");
const user_service_1 = require("../user/user.service");
const falso_1 = require("@ngneat/falso");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const cvService = app.get(cv_service_1.CvService);
    const userService = app.get(user_service_1.UserService);
    const users = [];
    for (let i = 0; i < 5; i++) {
        const user = await userService.create({
            username: (0, falso_1.randFullName)(),
            email: (0, falso_1.randEmail)(),
            password: '123456',
            role: i === 0 ? 'admin' : 'user'
        });
        users.push(user);
    }
    for (let i = 0; i < 20; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        await cvService.create({
            name: (0, falso_1.randFullName)(),
            firstname: (0, falso_1.randFullName)(),
            age: Math.floor(Math.random() * 50) + 18,
            cin: Math.floor(Math.random() * 10000000).toString(),
            job: (0, falso_1.randJobTitle)(),
            path: '/cv/path'
        }, randomUser);
    }
    console.log('Seeding done');
    await app.close();
}
bootstrap();
//# sourceMappingURL=cv.seeder.js.map