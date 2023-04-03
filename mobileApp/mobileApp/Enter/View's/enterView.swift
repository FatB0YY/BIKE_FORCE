
import SwiftUI

struct enterView: View {
    
    
    @State private var path = NavigationPath()
    var body: some View {
        NavigationStack(path: $path){
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
                        path.append("Вход")
                    }label: {
                        Text("Вход")
                            .frame(width: 343, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
//                            .border(Color.purple, width: 5)
                            
                     

                        
                            
                    }.padding(.top, 33)
                    Button{
                        path.append("Регистрация")
                    }label: {
                        Text("Регистрация")
                            .frame(width: 343, height: 46)
                            .background(Color.black)
                            .cornerRadius(13)
                            .foregroundColor(.white)
                    }
                }
                
            }
            .navigationDestination(for: String.self){view in
                if view == "Вход" {
                    enterView_01()
                }
                else if view == "Регистрация" {
                    enterView_02()
                }
                
            }
        }
        
        
    }
}

struct enterView_Previews: PreviewProvider {
    static var previews: some View {
        enterView()
    }
}
