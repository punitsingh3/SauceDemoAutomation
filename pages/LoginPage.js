class LoginPage{
    constructor(page){
        this.page = page;
        this.baseURL = (process.env.BASE_URL || 'https://www.saucedemo.com').trim();

        //Locators
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open(){
        console.log(`Opening the login page: ${this.baseURL}`);
        await this.page.goto(this.baseURL);
        console.log('Login page opened successfully');
    }

    async Login(username, password){
       await this.usernameInput.fill(username);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
    }
}
module.exports = { LoginPage };