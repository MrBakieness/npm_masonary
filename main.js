'use strict'
const url = "../node_modules/@mrbakieness/npm_masonary/main.css";
document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;

window.masonary = (function () {
    class Mason {
        constructor(container, item) {
            this.conatiner = container;
            this.items = item;

            this.conatiner.classList.add('mason_container');

            for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.add('mason_item');
            }

            this.init(this.conatiner, this.items);
        }
        // ========= UTILS =========
        init(container, items) {
            let ar_even = [];
            let col_height_even = 0;
            let ar_odd = [];
            let col_height_odd = 0;

            for (var i = 0; i < items.length; i++) {
                if (i % 2 === 0) { // index is even
                    ar_even.push(items[i]);

                    col_height_even += this.getHeight(items[i]);
                    console.log(this.getHeight(items[i]));
                } else {
                    ar_odd.push(items[i]);

                    col_height_odd += this.getHeight(items[i]);
                    console.log(this.getHeight(items[i]));
                }
            }

            console.log(col_height_odd);
            console.log(col_height_even);


            if (col_height_even >= col_height_odd) {
                container.style.height = col_height_even + 20 + 'px';
            } else {
                container.style.height = col_height_odd + 20 + 'px';
            }
        }
        getHeight(el){
            let margin = parseInt(getComputedStyle(el).marginTop) + parseInt(getComputedStyle(el).marginBottom);
            let height = parseInt(getComputedStyle(el).height);
            console.log('margin? ' + margin);
            return (margin + height);
        }
    }

    let selector = (c, i) => {
        let container = document.querySelector(c);
        if(container == null){
            return console.log('No container found with selector "' + c + '"');
        }
        let items = container.querySelectorAll(i);
        if(items.length == 0){
            return console.log('No items found with selector "' + i + '" in container');
        }
        return new Mason(container, items);
    }

    return selector;
}());