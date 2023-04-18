
import Foundation


class screenMove:ObservableObject{
    
    @Published var paths: [String] = []
    
    
    func push(_ path:String){
        paths.append(path)
    }
    
}


enum Path{
    case enterV
    case mainV
    case cartV
    
}
