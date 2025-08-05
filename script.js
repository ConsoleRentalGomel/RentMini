document.addEventListener('DOMContentLoaded', function() {
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

    // Функция для отображения списка игр или аксессуаров
    function displayList(listId, data, isGame = true) {
        const listElement = document.getElementById(listId);
        if (!listElement) return;
        
        listElement.innerHTML = '';
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

            // Загрузка и отображение списка аксессуаров
        loadJson('data/accessories.json').then(data => {
            if (data) {
                // Отображаем превью (первые 2 аксессуара)
                displayList('accessories-list-preview', data.slice(0, 2), false);
                 // Сохраняем полный список для последующего отображения
                window.fullAccessoriesList = data;
            }
        });

        
    // Модальное окно для игр
    const modal = document.getElementById('games-modal');
    const btn = document.getElementById('show-games-modal');
    const span = document.getElementsByClassName('close')[0];

    if (btn && modal) {
        btn.onclick = function() {
            modal.style.display = 'block';
        }
    }

    if (span && modal) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Добавляем правила проката
    const rulesContent = document.getElementById('rules-content');
    if (rulesContent) {
        rulesContent.innerHTML = `
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
    }
});