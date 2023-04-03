//
//  enterView_02.swift
//  laborExchange
//
//  Created by Islombek Gofurov on 02.04.2023.
//

import SwiftUI




struct enterView_02: View {
    @State private var path_enterView_02 = NavigationPath()
    @State private var student:userInfo = userInfo()
    @ObservedObject var userRegister = enterView_02_class()
    
    @State private var lastName:String = ""
    @State private var firstName:String = ""
    @State private var patronimyc:String = ""
    @State private var gender: Bool = true
    @State private var city: String = ""
    @State private var course: Int = 1
    @State private var email:String = ""
    @State private var password:String = ""
    @State private var phoneNumber:String = ""
    
    
    @State private var isViewVisible = false
    @State private var isUpButtonTapped = false
    
    @State private var isMarkedMale = true
    @State private var isMarkedFeMale = false
    
    var body: some View {
        NavigationStack(path: $path_enterView_02){
            VStack{
                Spacer()
                    .frame(height: 50)
                VStack{
                    Text("Личные данные")
                        .font(.system(size: 28))
                        .multilineTextAlignment(.center)
                        .padding(.top)
                    
                    
                    TextField("Фамилия*", text: $email)
                        .padding()
                        .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                        .padding(.horizontal)
                    TextField("Имя*", text: $password)
                        .padding()
                        .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                        .padding(.horizontal)
                    TextField("Отчество*", text: $email)
                        .padding()
                        .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                        .padding(.horizontal)
                   
                    Button{
                    }label: {
                        Text("Далее")
                        
                            .frame(width: 323, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
                    }.padding(.top)
                    
                    Spacer().frame(height: 20)
                }
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .padding(.horizontal)
                
                
                Spacer()
            }
            
            
            
            VStack{
                Spacer()
                    .frame(height: 50)
                VStack{
                    Text("Личные данные")
                        .frame(width: 323)
                        .font(.system(size: 28))
                        .multilineTextAlignment(.center)
                    .padding(.top)
                    HStack{
                        Text("Роль*")
                            .multilineTextAlignment(.leading)
                            .frame(width: 323, height: 46)
                  
                    }
                    HStack{
                        Button{
                            if isMarkedFeMale{
                                isMarkedFeMale = false
                                isMarkedMale = true
                            }
                        }label: {
                            Group{
                                Image(systemName: self.isMarkedMale ? "largecircle.fill.circle" : "circle")
                                                   .clipShape(Circle())
                                                   .foregroundColor(.black)
                                Text("Муж")
                            }          .foregroundColor(.black)
                        }
                        Button{
                            if isMarkedMale{
                                isMarkedMale = false
                                isMarkedFeMale = true
                            }
                        }label: {
                            Group{
                                Image(systemName: self.isMarkedFeMale ? "largecircle.fill.circle" : "circle")
                                                   .clipShape(Circle())
                                                   .foregroundColor(.black)
                                Text("Жен")
                            }          .foregroundColor(.black)
                        }
                    }
                }
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .padding(.horizontal)
            }
            .navigationTitle("Регистрация")
        
            .navigationDestination(for: String.self){view in
                if view == "Войти с помощью:"{
                    ContentView()
                }
                else if view == "Вход"{
                    ContentView()
                }
                else if view == "Забыли пароль"{
                    ContentView()
                }
            }
        }
    }
    
}
//struct choseRole: View {
//    var body: some View {
//        Text("sdf")
//
//    }
//}



struct enterView_02_Previews: PreviewProvider {
    static var previews: some View {
        enterView_02()
    }
}
