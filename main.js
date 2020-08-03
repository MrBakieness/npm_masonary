'use strict'
const url = "../node_modules/@mrbakieness/npm_masonary/main.css";
document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;

window.masonary = (function () {
    class Mason {
        constructor(container, item, m, columns) {
            console.log('constructor');
            console.log(columns);

            this.conatiner = container;
            this.items = item;

            this.conatiner.classList.add('mason_container');

            for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.add('mason_item');
                this.items[i].style.margin = m + 'px';
            }

            this.init(this.conatiner, this.items, m, columns);
        }
        // ========= UTILS =========
        init(container, items, margin, columns) {
            let ar_even = [];
            let col_height_even = 0;
            let ar_odd = [];
            let col_height_odd = 0;
            let selector = '';

            console.log('init');
            console.log(columns);
            if (columns < 2){
                columns = 2;
            }
        
            for (var i = 0; i < columns; i++) {
                console.log(i);
                if(i == columns){
                    selector = '.mason_item:nth-child(' + columns + 'n)';
                }
                selector = '.mason_item:nth-child(' + columns + 'n + ' + i + ')';
                console.log(selector);
                el = querySelector(selector);
                el.style.order = i;
            }

            for (var i = 0; i < items.length; i++) {
                if (i % 2 === 0) { // index is even
                    ar_even.push(items[i]);

                    col_height_even += this.getHeight(items[i], margin);
                } else {
                    ar_odd.push(items[i]);

                    col_height_odd += this.getHeight(items[i], margin);
                }
            }

            if (col_height_even >= col_height_odd) {
                container.style.height = col_height_even + 20 + 'px';
            } else {
                container.style.height = col_height_odd + 20 + 'px';
            }
        }
        getHeight(el, margin){
            let height = parseInt(getComputedStyle(el).height);

            return ((margin * 2) + height);
        }
    }

    let selector = (c, i, m = 20) => {
        console.log('selector');
        console.log(columns);

        let container = document.querySelector(c);
        if(container == null){
            return console.log('No container found with selector "' + c + '"');
        }
        let items = container.querySelectorAll(i);
        if(items.length == 0){
            return console.log('No items found with selector "' + i + '" in container');
        }
        return new Mason(container, items, m);
    }

    return selector;
}());

let selector = (c, i, m = 20, columns = 2) => {
    let container = document.querySelector(c);
    if(container == null){
        return console.log('No container found with selector "' + c + '"');
    }
    let items = container.querySelectorAll(i);
    if(items.length == 0){
        return console.log('No items found with selector "' + i + '" in container');
    }
    return new Mason(container, items, m, columns);
}