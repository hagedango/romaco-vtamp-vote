document.addEventListener('DOMContentLoaded', () => {
    const voteDateInput = document.getElementById('vote-date');
    const optionsContainer = document.getElementById('options-container');
    const voteButton = document.getElementById('vote-button');
    const resultMessage = document.getElementById('result-message');

    // とりあえず今日の日付をセットしてあげるわ
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    voteDateInput.value = `${yyyy}-${mm}-${dd}`;

    const candidates = [
        { id: 'candidate1', name: '選択肢 A' },
        { id: 'candidate2', name: '選択肢 B' },
        { id: 'candidate3', name: '選択肢 C' }
    ];

    function renderOptions() {
        optionsContainer.innerHTML = '';
        candidates.forEach(candidate => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <input type="radio" id="${candidate.id}" name="vote-option" value="${candidate.id}">
                <label for="${candidate.id}">${candidate.name}</label>
            `;
            optionsContainer.appendChild(optionDiv);
        });
    }

    voteButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="vote-option"]:checked');
        const selectedDate = voteDateInput.value;

        if (!selectedDate) {
            resultMessage.textContent = 'フン、日付も選べないのかしら？';
            resultMessage.style.color = 'var(--error-color)';
            return;
        }

        if (!selectedOption) {
            resultMessage.textContent = 'さっさと誰か一人選びなさいよ！';
            resultMessage.style.color = 'var(--error-color)';
            return;
        }

        // ここで本来はサーバーに送信するのよ。
        // 今回はvotes.jsonの更新は省略して、メッセージだけ出してあげる。
        console.log(`日付: ${selectedDate}, 選択: ${selectedOption.value}`);

        resultMessage.textContent = `ふん、まあいいわ。アンタのその一票、受け取ってあげたわよ。`;
        resultMessage.style.color = 'var(--secondary-color)';

        // 投票後は選択を解除してあげる
        selectedOption.checked = false;
    });

    // 最初に候補者を描画してあげるわ
    renderOptions();
});