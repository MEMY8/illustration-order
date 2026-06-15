function calculate() {

    const base =
        Number(document.querySelector('input[name="size"]:checked').value);

    const people =
        Number(document.getElementById('people').value);

    let total = base * people;

    total += Number(
        document.querySelector('input[name="bg"]:checked').value
    );

    total += Number(
        document.querySelector('input[name="design"]:checked').value
    );

    total += Number(
        document.querySelector('input[name="deadline"]:checked').value
    );

    document.querySelectorAll('.option').forEach(item => {
        if (item.checked) {
            total += Number(item.value);
        }
    });

    if (document.getElementById('commercial').checked) {
        total *= 1.5;
    }

    document.getElementById('total').textContent =
        Math.round(total).toLocaleString() + "円";

    generateTemplate(Math.round(total));
}

function generateTemplate(price) {

    const size =
        document.querySelector('input[name="size"]:checked')
        .parentElement.textContent.trim();

    const people =
        document.getElementById('people').value + "人";

    const bg =
        document.querySelector('input[name="bg"]:checked')
        .parentElement.textContent.trim();

    const design =
        document.querySelector('input[name="design"]:checked')
        .parentElement.textContent.trim();

    const deadline =
        document.querySelector('input[name="deadline"]:checked')
        .parentElement.textContent.trim();

    let options = [];

    document.querySelectorAll('.option').forEach(item => {
        if (item.checked) {
            options.push(
                item.parentElement.textContent.trim()
            );
        }
    });

    const other =
        document.getElementById('otherItem').value.trim();

    if (other !== "") {
        options.push("その他：" + other);
    }

    const commercial =
        document.getElementById('commercial').checked
            ? "あり"
            : "なし";

    document.getElementById('template').value =
`【ご依頼内容】

描写範囲
${size}

人数
${people}

背景
${bg}

小物・特殊装飾
${options.length ? options.join("、") : "なし"}

キャラクターデザイン
${design}

納期
${deadline}

商用利用
${commercial}

見積もり金額
${price.toLocaleString()}円`;
}

document.querySelectorAll(
    'input, select'
).forEach(item => {

    item.addEventListener(
        'change',
        calculate
    );

    item.addEventListener(
        'input',
        calculate
    );

});

document
.getElementById('copyBtn')
.addEventListener('click', () => {

    navigator.clipboard.writeText(
        document.getElementById('template').value
    );

    alert("テンプレートをコピーしました！");
});

calculate();
