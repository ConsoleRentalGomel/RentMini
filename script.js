// Функция для загрузки JSON данных
        async function loadJson(filename) {
            try {
                const response = await fetch(filename);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
                return null;
            }
        }

        // Загрузка и отображение описания консоли
        loadJson('data/console.json').then(data => {
            if (data) {
                document.getElementById('console-description').innerText = data.description;
            }
        });

        // Функция для отображения списка игр или аксессуаров
        function displayList(listId, data, isGame = true) {
            const listElement = document.getElementById(listId);
            listElement.innerHTML = ''; // Очищаем список перед заполнением

            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.image_url}" alt="${item.name}">
                    <p>${item.description}</p>
                    ${isGame ? `<p>Игроков: ${item.players}</p>` : ''}
                `;
                listElement.appendChild(itemElement);
            });
        }

        // Загрузка и отображение списка игр
        loadJson('data/games.json').then(data => {
            if (data) {
                // Отображаем превью (первые 2 игры)
                displayList('games-list-preview', data.slice(0, 2), true);
                // Сохраняем полный список для последующего отображения
                window.fullGamesList = data;
            }
        });

        // Загрузка и отображение списка аксессуаров
        loadJson('data/accessories.json').then(data => {
            if (data) {
                // Отображаем превью (первые 2 аксессуара)
                displayList('accessories-list-preview', data.slice(0, 2), false);
                 // Сохраняем полный список для последующего отображения
                window.fullAccessoriesList = data;
            }
        });

        // Обработчик для кнопки "Показать все игры"
        document.getElementById('show-all-games').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('games-list-preview').style.display = 'none';
            document.getElementById('games-list-full').style.display = 'block';
            document.getElementById('show-all-games').style.display = 'none'; // Скрываем кнопку
            if (window.fullGamesList) {
                 displayList('games-list-full', window.fullGamesList, true);
            }
        });

         // Обработчик для кнопки "Показать все аксессуары"
        document.getElementById('show-all-accessories').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('accessories-list-preview').style.display = 'none';
            document.getElementById('accessories-list-full').style.display = 'block';
            document.getElementById('show-all-accessories').style.display = 'none'; // Скрываем кнопку
             if (window.fullAccessoriesList) {
                displayList('accessories-list-full', window.fullAccessoriesList, false);
             }
        });


        // Обработчики для вариантов оплаты
        document.querySelectorAll('.payment-option').forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = e.target.dataset.target;
                const targetElement = document.getElementById(targetId);

                // Скрываем все инструкции
                document.querySelectorAll('#payment div').forEach(div => {
                    div.style.display = 'none';
                });

                // Показываем нужную инструкцию
                if (targetElement) {
                    targetElement.style.display = 'block';
                }
            });
        });

         // Добавляем правила проката
        document.getElementById('rules-content').innerHTML = `
            <h2>Правила проката</h2>
            <ul>
                <li>Для оформления договора проката необходим паспорт.</li>
                <li>Срок проката начинается с момента подписания акта приема-передачи и заканчивается в момент возврата имущества по акту.</li>
                <li>Имущество передается в чистом и исправном состоянии. При возврате имущество также должно быть чистым и исправным.</li>
                <li>В случае порчи или утери имущества арендатор возмещает полную стоимость ремонта или рыночную стоимость имущества.</li>
                <li>Запрещается передавать имущество третьим лицам.</li>
                <li>Арендатор обязуется использовать имущество по назначению и в соответствии с инструкциями по эксплуатации.</li>
                <li>При возникновении неисправностей во время проката, арендатор обязан незамедлительно сообщить об этом арендодателю.</li>
                <li>Досрочное расторжение договора возможно по соглашению сторон.</li>
            </ul>
        `;