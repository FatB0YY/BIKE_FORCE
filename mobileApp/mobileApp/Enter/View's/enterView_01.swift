
import SwiftUI

struct enterView_01: View {
    @State private var logString:String = ""
    @State private var pasString:String = ""
    @State private var enterView_01_path = NavigationPath()
    
    @ObservedObject var userLogin = enterView_01_class()
    var body: some View {
        NavigationStack(path: $enterView_01_path){
            VStack{
                Spacer()
                    .frame(height: 50)
                VStack{
                    Text("Личные данные")
                        .font(.system(size: 28))
                        .multilineTextAlignment(.center)
                        .padding(.top)
                        
                        
                    TextField("Логин", text: $userLogin.userNameCONST)
                                .padding()
                                .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                                .padding(.horizontal)
                    TextField("Пароль", text: $userLogin.userPasswordCONST)
                                .padding()
                                .overlay(RoundedRectangle(cornerRadius: 10.0).strokeBorder(Color.black, style: StrokeStyle(lineWidth: 1.0)))
                                .padding(.horizontal)
                    Button{
                        enterView_01_path.append("Вход")
//                        userLogin.logIn()
//                        enterView_01_path = userLogin.pathRegister
                    }label: {
                        Text("Вход")
                            
                            .frame(width: 323, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
                    }.padding(.top)
                    
                    Button{
                        enterView_01_path.append("Забыли пароль")
                    }label: {
                        Text("Забыли пароль")
                            .foregroundColor(.gray)
                    }
                    Spacer().frame(height: 20)
                }
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                .padding(.horizontal)
                
                Group{
                    Text("Войти с помощью:")
                        .padding(.top, 26)
                    Button{
                        enterView_01_path.append("Войти с помощью")
                    }label: {
                        Image("vk")
                            .resizable()
                            .frame(width: 31, height: 15)
                            .frame(width: 323, height: 46)

                            .cornerRadius(13)

                            
                    }.background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                Spacer()
            }
            
            
                .navigationTitle("Вход")
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

struct enterView_01_Previews: PreviewProvider {
    static var previews: some View {
        enterView_01()
    }
}
