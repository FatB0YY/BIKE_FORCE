//
//  EnterView2.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 16.04.2023.
//

import SwiftUI

struct EnterView_2: View {
    var addProgress:(_ i:Int) ->Void
    
    @Binding var email:String
    var body: some View {
        
        GeometryReader{geometry in
            VStack{
                Text("Вход")
                    .font(.system(.largeTitle))
                TextField("Почта", text: $email)
                    .padding()
                    .frame(width: 350, height: 50)
                    .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                    
                TextField("Пароль", text: $email)
                    .padding()
                    .frame(width: 350, height: 50)
                    .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                    
                
                Button(action: {
                    withAnimation {
                        addProgress(1)
                    }
                }) {
                    Text("Далее")
                        .frame(width: 350, height: 50)
                        .background(Color.black)
                        .cornerRadius(10)
                        .foregroundColor(.white)
                }
                
                
            }
            
        }
    }
}

//struct EnterView2_Previews: PreviewProvider {
//    static var previews: some View {
//        EnterView2(email: .constant(""))
//    }
//}
