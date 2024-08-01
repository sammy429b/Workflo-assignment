export class ApiConfig{
    // static BASE_URL = "http://localhost:3030"
    static BASE_URL = "https://workflo-backend-5alu.onrender.com/"
    static register =  this.BASE_URL + "/register"
    static login = this.BASE_URL + "/login"
    static logout = this.BASE_URL + "/logout"

    static change = this.BASE_URL + "/password/change"
    static reset = this.BASE_URL + "/password/reset"
    static verifyotp = this.BASE_URL + "/password/otp"
    static getotp = this.BASE_URL + "/password/email"


    static addTask = this.BASE_URL + "/addtask"
    static getTask = this.BASE_URL + "/gettask"
    static deleteTask = this.BASE_URL + "/deletetask"
    static updateTask = this.BASE_URL + "/updatetask"
}