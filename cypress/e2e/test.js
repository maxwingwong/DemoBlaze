describe("Demoblaze Website", () => {

    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })

    //Option tab button checking
    const displayOptionItems = [
        {
            "optionTab": "Contact",
            "labelID": "exampleModalLabel",
            "displayName": "New message"
        },
        {
            "optionTab": "About Us",
            "labelID": "videoModalLabel",
            "displayName": "About us"
        },
        {
            "optionTab": "Log in",
            "labelID": "logInModalLabel",
            "displayName": "Log in"
        },
        {
            "optionTab": "Sign up",
            "labelID": "signInModalLabel",
            "displayName": "Sign up"
        },
    ]
    const htmlOptionItems = [
        {
            "optionTab": "Home ",
            "html": "index.html"
        },
        {
            "optionTab": "Cart",
            "html": "cart.html"
        },
    ]

    function htmlOptionCheck(optionTab, html) {
        return cy.contains(optionTab)
            .should('have.attr', 'href', html)
    }

    function invokeBlockCheck(optionTab, labelID, displayName) {
        cy.contains(optionTab).invoke('css', 'display', 'block')
        return cy.get(`[id="${labelID}"]`)
            .should('contain', displayName)
    }

    it('Asssertion of Option tabs', () => {

        htmlOptionItems.map((item) => { htmlOptionCheck(item.optionTab, item.html) })
        displayOptionItems.map((item) => { invokeBlockCheck(item.optionTab, item.labelID, item.displayName) })

    })

    //Product tab checking
    const productTabItems = [
        {
            "productTab": "Phones",
            "cardTitle": "Samsung galaxy s6",
        },
        {
            "productTab": "Laptops",
            "cardTitle": "Sony vaio i5",
        },
        {
            "productTab": "Monitors",
            "cardTitle": "Apple monitor 24",
        },
    ]

    function productTabCheck(productTab, cardTitle) {
        cy.contains(productTab).click()
        return cy.get('.hrefch')
            .should('contain', cardTitle);
    }

    it('Asssertion of Product tabs', () => {
        productTabItems.map((item) => { productTabCheck(item.productTab, item.cardTitle) })
    })

    //Contact form

    it('Positive scenario for Sending the Contact form', () => {
        cy.get('#exampleModal').invoke('css', 'display', 'block')
        cy.get('#recipient-email').type('usera@gmail.com')
        cy.get('#recipient-name').type('username1')
        cy.get('#message-text').type('I want to send a message')
        cy.contains("Send message").click()
        cy.on('window:alert', (txt) => {
            //Assertion
            expect(txt).to.contains('Thanks for the message!!')
        })
    })

    //Sign Up form

    const signUpMessageItems = ["Sign up successful.",
        "This user already exist.",
        "Please fill out Username and Password."]

    function signUpMessageCheck(signUpMessageItems) {
        cy.get('[onclick="register()"]').click()
        cy.wait(2000)
        return cy.on('window:alert', (txt) => {
            //Assertion
            expect(txt).to.contains(signUpMessageItems);
        })
    }

    // it('Positive scenario for sending the Sign Up form', () => {
    //     cy.get('#signInModal').invoke('css', 'display', 'block')
    //     cy.get('#sign-username').type('testuser3')
    //     cy.get('#sign-password').type('testpassword3')
    //     signUpMessageCheck(signUpMessageItems[0])
    // })

    it('User has already existed when sign up', () => {
        cy.get('#signInModal').invoke('css', 'display', 'block')
        cy.get('#sign-username').type('useraaaaa')
        cy.get('#sign-password').type('12345')
        signUpMessageCheck(signUpMessageItems[1])
    })

    it('User has not filled the form when sign up', () => {
        cy.get('#signInModal').invoke('css', 'display', 'block')
        signUpMessageCheck(signUpMessageItems[2])
    })

    //Login form

    const loginMessageItems = [
        "Wrong password.",
        "Please fill out Username and Password.",
        "User does not exist."
    ]

    const loginCredentialsItems = [
        {
            "username": "useraaaaa",
            "password": "12345",
        },
        {
            "username": "a",
            "password": "b",
        },
        {
            "username": "dddddddddddddddddddd",
            "password": "dddddddddddddddddddd",
        },
    ]
    function loginMessageCheck(LoginMessageItems) {
        cy.get('[onclick="logIn()"]').click()
        cy.wait(1000)
        return cy.on('window:alert', (txt) => {
            //Assertion
            expect(txt).to.contains(LoginMessageItems);
        })
    }

    function loginCredentialsInput(username, password) {
        cy.get('#logInModal').invoke('css', 'display', 'block')
        cy.get('#loginusername').type(username)
        cy.get('#loginpassword').type(password)
    }

    it('Positive scenario for sending the login form', () => {
        loginCredentialsInput(loginCredentialsItems[0].username, loginCredentialsItems[0].password)
        cy.get('[onclick="logIn()"]').click()
        cy.get('#nameofuser').should('contain', 'Welcome usera')
    })

    it('Logout functionality', () => {
        loginCredentialsInput(loginCredentialsItems[0].username, loginCredentialsItems[0].password)
        cy.get('[onclick="logIn()"]').click()
        cy.get('[onclick="logOut()"]').click()
        cy.get('[data-target="#logInModal"]').should('contain', 'Log in')
    })

    it('User inputs correct login name but incorrect password', () => {
        loginCredentialsInput(loginCredentialsItems[1].username, loginCredentialsItems[1].password)
        loginMessageCheck(loginMessageItems[0])
    })

    it('User has not filled the form when login', () => {
        cy.get('#logInModal').invoke('css', 'display', 'block')
        loginMessageCheck(loginMessageItems[1])
    })

    it('User inputs incorrect username', () => {
        loginCredentialsInput(loginCredentialsItems[2].username, loginCredentialsItems[2].password)
        loginMessageCheck(loginMessageItems[2])
    })

    //Cart-Fill out Name & Creditcard message

    function placeOrder() {
        cy.get('#cartur').click()
        cy.contains('Place Order').click()
    }

    function emptyItemsMessageCheck() {
        cy.get('[onclick="purchaseOrder()"]').click()
        cy.wait(1000)
        return cy.on('window:alert', (txt) => {
            //Assertion
            expect(txt).to.contains("Please fill out Name and Creditcard.");
        })
    }

    it('Asssertion of fill name & creditcard message 1', () => {
        placeOrder()
        emptyItemsMessageCheck()
    })

    it('Asssertion of fill name & creditcard message 2', () => {
        placeOrder()
        cy.get('#name').type('user')
        emptyItemsMessageCheck()
    })

    it('Asssertion of fill name & creditcard message 3', () => {
        placeOrder()
        cy.get('#card').type('12345')
        emptyItemsMessageCheck()
    })

    //Cart functionality- Add product into cart

    it.only('Cart functionality-Add product', () => {
        cy.contains('Samsung galaxy s6').click()
        cy.get('[onclick="addToCart(1)"]').click()
        cy.on('window:alert', (txt) => {
            //Assertion
            expect(txt).to.contains('Product added');
        })
        cy.off('window:alert', () => { })

    })

    const purchaseItems = [
        {
            "product": "Samsung galaxy s6",
            "productID": "1",
        },
        {
            "product": "Sony vaio i5",
            "productID": "8",
        },
    ]

    function purchase(product, productID) {
        cy.contains('Home ').click()
        cy.contains(product).click()
        cy.get(`[onclick="addToCart(${productID})"]`).click()
        cy.off('window:alert', () => { })
    }

    function fillInPlaceOrderForm(name, country, city, card, month, year) {
        cy.contains('Home ').click()
        cy.get('#cartur').click()
        cy.get('[data-target="#orderModal"]').click()
        cy.get('#name').type(name)
        cy.get('#country').type(country)
        cy.get('#city').type(city)
        cy.get('#card').type(card)
        cy.get('#month').type(month)
        cy.get('#year').type(year)
        cy.get('[onclick="purchaseOrder()"]').click()
    }

    it('Purchase products successfully', () => {
        purchase(purchaseItems[0].product, purchaseItems[0].productID)
        purchase(purchaseItems[1].product, purchaseItems[1].productID)
        fillInPlaceOrderForm('testuser1111', 'USA222222', 'london', '1234444444', 'January', '2023')
        cy.get('[class="sweet-alert  showSweetAlert visible"]').should('contain', 'Thank you for your purchase!')
    })
})