
import SwiftUI

struct enterView: View {
    @ObservedObject var model:enterView_class = enterView_class()
    
    @State private var path = NavigationPath()
    @State private var logIn:Bool = false
    @State private var progress:Int = 0
    
    @State private var email:String = ""
    @State private var password:String = ""
    @State private var chekPassword:String = ""
    
    
    var body: some View {
        NavigationStack(path: $path){
            GeometryReader{ geometry in
                EnterView_1(addProgress: addProgress)
                    .offset(x: progress == 0 ? geometry.size.height/30 : geometry.size.width, y: geometry.size.width/2)
                EnterView_2(addProgress: addProgress, email: $email)
                    .offset(x: progress == 1 ? geometry.size.height/30 : geometry.size.width, y: geometry.size.width/2)
                
                EnterView_3(addProgress: addProgress, email: $email, password: $password, checkPassword: $chekPassword, model:model)
                    .offset(x: progress == 5 ? geometry.size.height/30 : geometry.size.width, y: geometry.size.width/2)
            }
            
            
            .navigationDestination(for: String.self){view in
                if view == "Вход" {
                    MainView()
                }
                else if view == "Регистрация" {
                    
                }else if view == "Корзина"{
                    CartView()
                }
                
            }
        }
        
        
    }
    func addProgress(i :Int){
        
//        guard progress < 2 else{
//            progress = 0
//            return
//        }
//        progress += 1

        
        
        if i == 0 {
            progress = 1
        }else if i == 1{
            path.append("Вход")
        }else if i == 5{
            progress = 5
        }else if i == 6{
            
        }
    }
    
    
}


struct enterView_Previews: PreviewProvider {
    static var previews: some View {
        enterView()
    }
}
