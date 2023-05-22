
import Foundation


class screenMove<T:Hashable>:ObservableObject{
    
    @Published var paths: [T] = []
    
    
    func push(_ path:T){
        paths.append(path)
    }
    
}


enum Path{
    case enterV
    case mainV
    case cartV
//    case productV
}
