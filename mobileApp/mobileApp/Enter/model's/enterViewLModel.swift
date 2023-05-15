
import Foundation
import SwiftUI


class enterView_class: ObservableObject{

    func logIn(){
       
        
    }
    
    
    func passowrdValidation(a: String)->String{
        
        let passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
        let passwordTest = NSPredicate(format: "SELF MATCHES %@", passwordRegex)
        if passwordTest.evaluate(with: a.self) {
            return("Пароль удовлетворяет требованиям")
        } else {
            return("Пароль не удовлетворяет требованиям")
        }
    }
    func check2Password(a : String, b : String)->String{
    
        if a == b{
            return "пароли совпадают"
        }
        return "пароли не совпадают"

    }
}



//    @Published var user = userInfo()
//    @Published var errorMessage: String = ""
//    @Published var pathRegister = NavigationPath()
//    @Published var email:String = ""
//    @Published var userPasswordCONST:String = ""
    
    
//
//
//let url = URL(string: "\(user.link)/user")!
//var request = URLRequest(url: url)
//request.httpMethod = "POST"
//request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//let user = ["email": "\(email)", "password": "\(userPasswordCONST)", "roles": "USER"]
//let jsonData = try! JSONSerialization.data(withJSONObject: user, options: [])
//request.httpBody = jsonData
//
//let task = URLSession.shared.dataTask(with: request) { data, response, error in
//    guard let response = response as? HTTPURLResponse, error == nil else {
//        print("Error: \(error!)")
//        self.errorMessage = "Error: \(error!)"
//        return
//    }
//    if response.statusCode == 409 {
//        print("User is exists")
//        self.user.email = self.email
//        self.user.password = self.userPasswordCONST
//        self.pathRegister.append("Вход")
//        
//    } else {
//        print("Error creating user: \(response.statusCode)")
//        self.errorMessage = "Error: \(String(describing: error))"
//    }
//}
////        print("Log in 2 userName is :\(self.user.lastName).")
//task.resume()
