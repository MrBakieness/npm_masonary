'use strict'
const url = "../node_modules/@mrbakieness/npm_masonary/main.css";
document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;

window.masonary = (function () {
    class Mason {
        constructor(container, item, m, columns) {
            this.conatiner = container;
            this.items = item;

            this.conatiner.classList.add('mason_container');

            for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.add('mason_item');
                this.items[i].style.margin = m + 'px';
                this.items[i].style.width = Math.floor(100 / 3) + '%';
            }

            this.init(this.conatiner, this.items, m, columns);
        }
        // ========= UTILS =========
        init(container, items, margin, columns) {
            let arr = this.sortCol(columns, items);
            let newheight = this.getHeight(arr, margin);

            container.style.height = newheight + 20 + 'px';
        }
        getHeight(arr, margin) {
            let final = 0;
            let final_arr = [];
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr[i].length; j++){
                    let height = parseInt(getComputedStyle(arr[i][j]).height);
                    final += ((margin * 2) + height);
                    arr[i][j].style.order = i + 1
                }
                final_arr.push(final);
                final = 0;
            }

            return Math.max(...final_arr);
        }
        sortCol(columns, items) {
            let c_index = 1;
            let c_arr = [];
            if (columns > items.length) {
                columns = items.length;
            }

            for (let i = 0; i < columns; i++) {
                let variableDynamic = `${i + 1}`;
                window['arr' + variableDynamic] = [];
                c_arr.push(window['arr' + `${i+1}`])
            }

            for (let i = 1; i <= items.length; i++) {
                window['arr' + `${c_index}`].push(items[i-1]);

                if (i % columns == 0) {
                    c_index = 1;
                } else {
                    c_index++
                }
            }

            return c_arr;
        }
    }

    let selector = (c, i, m = 20, columns) => {
        let container = document.querySelector(c);
        if (container == null) {
            return console.log('No container found with selector "' + c + '"');
        }
        let items = container.querySelectorAll(i);
        if (items.length == 0) {
            return console.log('No items found with selector "' + i + '" in container');
        }
        return new Mason(container, items, m, columns);
    }

    return selector;
}());