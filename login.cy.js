describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio'); // Зашёл на сайт

         cy.get('#mail').type('german@dolnikov.ru'); // Ввёл верный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввёл верный пароль
         cy.get('#loginButton').click(); // Нажал войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверил, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
     })

     it('Логика восстановления пароля', function () {
        cy.visit('https://login.qa.studio'); // Зашёл на сайт

        cy.get('#forgotEmailButton').click(); // Нажал кнопку Забыли пароль
        cy.get('#mailForgot').type('romanmiasnikow93@yandex.ru'); // Ввёл любой имейл
        cy.get('#restoreEmailButton').click(); // Нажал Отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверил текст на совпадение
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton').should('be.visible'); // Есть крестик и он виден для пользователя 
    })

    it('Неверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio'); // Зашёл на сайт

        cy.get('#mail').type('german@dolnikov.ru'); // Ввёл верный логин
        cy.get('#pass').type('iLoveqastudio3'); // Ввёл неверный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверил, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
    })

    it('Верный пароль и неверный логин', function () {
        cy.visit('https://login.qa.studio'); // Зашёл на сайт

        cy.get('#mail').type('germa@dolnikov.ru'); // Ввёл неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввёл верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверил, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
    })

    it('Негативный кейс валидации - логин без @', function () {
        cy.visit('https://login.qa.studio'); // Зашёл на сайт

        cy.get('#mail').type('germandolnikov.ru'); // Ввёл логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввёл верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверил, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio'); // Зашёл на сайт

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввёл верный логин, но не соблюдая регистр
        cy.get('#pass').type('iLoveqastudio1'); // Ввёл верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверил, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
    })

    describe('Проверка покупки нового аватара', function () {                 // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
             cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
             cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
             cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
             cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
             cy.wait(2000);
             cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
             cy.wait(2000);
             cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
             cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
             cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
             cy.get('.card_csv').type('125');                             // вводим CVV карты
             cy.get('.card_date').type('1226');                           // вводим срок действия карты
             cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
             cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
             cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
             cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
             cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
         });
     });   
 })