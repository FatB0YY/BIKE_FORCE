//
//  enterViewRModel.swift
//  laborExchange
//
//  Created by Islombek Gofurov on 02.04.2023.
//

import Foundation
import SwiftUI

//class enterView_02_class: ObservableObject{
//    @Published var user = userInfo()
//    @Published var errorMessage: String = ""
//    @Published var pathRegister = NavigationPath()
//    @Published var email:String = ""
//    @Published var userPasswordCONST:String = ""
//    
//    
//    func registerUser() {
//        
//
//    }
//    
//    
//}
//
//

//let url = URL(string: "\(user.link)/create-user")!
//        var request = URLRequest(url: url)
//        request.httpMethod = "POST"
//        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//
//        let user = ["email": "\(userNameCONST)", "password": "\(password)", "roles": "USER"]
//        let jsonData = try! JSONSerialization.data(withJSONObject: user, options: [])
//        request.httpBody = jsonData
//
//        let task = URLSession.shared.dataTask(with: request) { data, response, error in
//            guard let response = response as? HTTPURLResponse, error == nil else {
//                print("Error: \(error!)")
//                self.errorMessage = "Error: \(error!)"
//                return
//            }
//
//            if response.statusCode == 201 {
//                print("User created successfully")
//                self.user.email = self.email
//                self.user.password = self.userPasswordCONST
//                self.pathRegister.append("")
//            } else {
//                print("Error creating user: \(response.statusCode)")
//                self.errorMessage = "Error: \(String(describing: error))"
//            }
//        }
//        task.resume()
