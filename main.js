'use strict'
const url = "../node_modules/@mrbakieness/npm_masonary/main.css";
document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;

window.masonary = (function () {
    class Mason {
        constructor(container, item, m, columns, max_width) {
            this.conatiner = container;
            this.items = item;
            this.args = {
                columns: columns,
                margin: m + 'px',
                max_width: max_width + 'px'
            };

            this.conatiner.classList.add('mason_container');
            let masons = document.getElementsByClassName('mason_container');

            for(let i = 0; i < masons.length; i++){
                this.conatiner.id = 'mason_' + [i];
            }

            this.conatiner.style.maxWidth = max_width + 'px';
            this.screen();
        }
        // ========= UTILS =========
        screen() {
            this.bp = {
                sm: false,
                md: false,
                lg: false,
                xl: false
            }
            const mason = this;
            let col = mason.args.columns;
            mason.checkScreen(col);

            window.addEventListener('resize', function () {
                mason.checkScreen(col);
            });
        }
        setBool(bool) {
            this.bp = {
                sm: false,
                md: false,
                lg: false,
                xl: false
            }

            this.bp[bool] = true;
        }
        checkScreen(col) {
            if (window.innerWidth >= 1200 && this.bp.xl == false) {
                this.setBool('xl');
                this.responsiveInit(col, 1, this.conatiner, this.items, this.args.margin);
            } else if (window.innerWidth >= 900 && window.innerWidth < 1199 && this.bp.lg == false) {
                this.setBool('lg');
                this.responsiveInit(col, 2, this.conatiner, this.items, this.args.margin);
            } else if (window.innerWidth >= 700 && window.innerWidth < 899 && this.bp.md == false) {
                this.setBool('md');
                this.responsiveInit(col, 4, this.conatiner, this.items, this.args.margin);
            } else if (window.innerWidth < 699 && this.bp.sm == false) {
                this.setBool('sm');
                this.responsiveInit(col, 6, this.conatiner, this.items, this.args.margin);
            }
        }
        responsiveInit(col, num, container, items, margin) {
            col = this.setArgs(col, num, this.items, this.args.margin);

            let mar = parseInt(margin);
            this.init(container, items, mar, col)
        }
        setArgs(col, num, items, mar) {
            if (col / num == 2.5) {
                col = 2;
            } else {
                col = Math.ceil(col / num);
            }

            let width = 'calc( ' + parseInt((100 / col)) + '% - ' + mar + ' )';

            for (let i = 0; i < items.length; i++) {
                items[i].classList.add('mason_item');
                items[i].style.width = width;
            }

            return col;
        }
        init(container, items, margin, columns) {
            let arr = this.sortCol(columns, items);
            let newheight = this.getHeight(arr, margin);
            this.buildCol(columns);

            container.style.height = newheight + 20 + 'px';
        }
        getHeight(arr, margin) {
            let final = 0;
            let final_arr = [];
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    let height = parseInt(getComputedStyle(arr[i][j]).height);
                    final += ((margin * 2) + height);
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
                window['arr' + `${c_index}`].push(items[i - 1]);

                if (i % columns == 0) {
                    c_index = 1;
                } else {
                    c_index++
                }
            }

            return c_arr;
        }
        buildCol(columns) {
            const hs = document.getElementById(this.conatiner.id + 'mason_style');
            if (hs != null) {
                hs.parentNode.removeChild(hs);
            }

            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = this.conatiner.id + '_style';

            for (let i = 1; i < columns + 1; i++) {
                if (i == columns) {
                    style.innerHTML += '#' + this.conatiner.id + ' .mason_item:nth-of-type( ' + columns + 'n ) { order: ' + columns + '; }';
                } else {
                    style.innerHTML += '#' + this.conatiner.id + ' .mason_item:nth-of-type( ' + columns + 'n+ ' + i + ' ) { order: ' + i + '; }';
                    let el = document.createElement('span');
                    el.classList.add('mason_item', 'break');
                    this.conatiner.appendChild(el);
                }
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    let selector = (c, i, args) => {
        let container = document.querySelector(c);
        if (container == null) {
            return console.log('No container found with selector "' + c + '"');
        }
        let items = container.querySelectorAll(i);
        if (items.length == 0) {
            return console.log('No items found with selector "' + i + '" in container');
        }

        let arg = args;
        if (arg === undefined) {
            arg = {
                columns: 4,
                margin: 15,
                max_width: 1400
            }
        } else {
            if (!arg.columns) {
                arg.columns = 4;
            }
            if (!arg.margin) {
                arg.margin = 15;
            }
            if (!arg.max_width) {
                arg.max_width = 1200;
            }
        }

        return new Mason(container, items, arg.margin, arg.columns, arg.max_width);
    }

    return selector;
}());