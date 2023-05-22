//
//  EnterVeiw_1.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 16.04.2023.
//

import SwiftUI

struct EnterView_1: View {
    
    var addProgress: (_ i:Int)-> Void
    var body: some View {
        GeometryReader{ geometry in
            VStack{
                Group{
                    Text("Здравствуйте!")
                        .font(.system(size: 24))
                        .fontWeight(.medium)
                    Group{
                        Text("BikeForce - возможность")
                            .padding(.top, 1)
                        Text(" получить велик мечты!")
                    }
                    .font(.system(size: 20))
                    .multilineTextAlignment(.center)
                }
                
                Group{
                    Button{
                        addProgress(0)
                    }label: {
                        Text("Вход")
                            .frame(width: 343, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
                        //                            .border(Color.purple, width: 5)
                        
                        
                        
                        
                        
                    }.padding(.top, 33)
                    Button{
                        addProgress(5)
                    }label: {
                        Text("Регистрация")
                            .frame(width: 343, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
                    }
                }
                
            }
        }
    }
}

//struct EnterVeiw_1_Previews: PreviewProvider {
//    static var previews: some View {
//        EnterVeiw_1(addProgress: addProgress())
//    }
//}
