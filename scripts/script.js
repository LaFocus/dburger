// base obj
const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'img/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
}
///////////////////////////////////////////////////////////////////////////////

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    modal = document.querySelector('.modal'),
    check__body = document.querySelector('.check__body'),
    check__footer = document.querySelector('.check__footer'),
    modalBtn = document.querySelector('.modalBtn')


productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    // console.log(product[parentId]);
    basket()
}
// toLowerCase() - преобразует большие буквы в маленькие

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.wrapper__list-count')

        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = po.amount
        } else {
            parentIndicator.classList.remove('active')
            parentIndicator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount.toLocaleString()
    totalPriceBasket.innerHTML = totalSummProduct()

}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSumm
    }
    return total.toLocaleString()
}
function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        totalSumm: price,
        amount,
        img
    } = productData
    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" class="wrapper__navbar-productImage" alt="">
                <div class="wrapper__navbar-infoSub">
                        <p class="wrapper__navbar-infoName">${name}</p>
                        <p class="wrapper__navbar-infoPrice">
                        <span>${price}</span> сум
                    </p>
                </div>
                </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol minus" data-symbol="-">-</button>
                <output class="wrapper__navbar-counter">${amount}</output>
                <button class="wrapper__navbar-symbol plus" data-symbol="+">+</button>
            </div>
        </div>
    `
}
basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})

window.addEventListener('click', e => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idParent].amount--
            else if (attr == '+') product[idParent].amount++
            basket()
        }
    }
})

btnCard.addEventListener('click', function () {
    modal.classList.add('active')
    check__body.innerHTML = ''
    for (const key in product) {
        const { name, totalSumm, amount } = product[key]
        if (amount) {
            check__body.innerHTML +=
                `
            <div class="check__body-item">
            <p class="check__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
            </p>
            <p class="check__body-item_summ">${totalSumm}</p>
        </div>
            `
        }
    }
    check__footer.innerHTML = totalSummProduct()
})
modalBtn.addEventListener('click',function () {
    window.print()
})