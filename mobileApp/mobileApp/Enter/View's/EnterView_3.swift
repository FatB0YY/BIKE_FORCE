//
//  EnterView3.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 16.04.2023.
//

import SwiftUI

struct EnterView_3: View {
    
    var addProgress:(_ i:Int) ->Void
    
    @Binding var email:String
    @Binding var password:String
    @Binding var checkPassword:String
    @ObservedObject var model:enterView_class
    @State private var errorMessage:String = ""
    var body: some View {
        
        GeometryReader{geometry in
            VStack{
                Text("Регистрация")
                    .font(.system(.largeTitle))
                TextField("Почта", text: $email)
                    .padding()
                    .frame(width: 350, height: 50)
                    .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                    
                TextField("Пароль", text: $password)
                    .padding()
                    .frame(width: 350, height: 50)
                    .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                TextField("Повторите пароль", text: $checkPassword)
                    .padding()
                    .frame(width: 350, height: 50)
                    .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
               
                Button(action: {
                    
                    if checkPass(){
                        withAnimation {
                            addProgress(6)
                        }
                    }
                    
                }) {
                    Text("Далее")
                        .frame(width: 350, height: 50)
                        .background(Color.black)
                        .cornerRadius(10)
                        .foregroundColor(.white)
                }
                Text(errorMessage)
                    .foregroundColor(.red)
                
            }
            
        }
    }
    func checkPass()->Bool{
       
        if model.passowrdValidation(a: password) == "Пароль не удовлетворяет требованиям"{
            errorMessage = "Пароль не удовлетворяет требованиям"
            
            return false
        }
        if model.check2Password(a: password, b: checkPassword) == "пароли не совпадают"{
            errorMessage = "пароли не совпадают"
            return false
        }
        return true
    }
}

//struct EnterView_3_Previews: PreviewProvider {
//    static var previews: some View {
//        EnterView_3()
//    }
//}
