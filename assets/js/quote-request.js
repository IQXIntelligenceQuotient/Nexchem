(() => {
    const form = document.querySelector('form[data-whatsapp]');
    const product = form.elements.product;
    const quoteId = form.closest('section').id;

    for (const link of document.querySelectorAll('[data-quote-product]')) {
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
            event.preventDefault();
            product.value = link.dataset.quoteProduct;
            if (location.hash === '#' + quoteId) {
                document.getElementById(quoteId).scrollIntoView();
            } else {
                location.hash = quoteId;
            }
            product.focus({ preventScroll: true });
        });
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        const fields = [
            ['Name', data.get('name')],
            ['Email', data.get('email')],
            ['Phone', data.get('phone')],
            ['Product', product.selectedOptions[0].text],
            ['Order details', data.get('message')]
        ];
        const lines = ['Hello, I would like a quote for ' + form.dataset.quoteSubject + '.'];
        for (const [label, value] of fields) {
            if (value.trim()) lines.push(label + ': ' + value.trim());
        }
        const url = 'https://wa.me/' + form.dataset.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');
    });

    form.hidden = false;
})();
