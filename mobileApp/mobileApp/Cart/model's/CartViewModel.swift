
import Foundation


class CartViewModel:ObservableObject{

    @Published private(set) var products:[Product] = []
    @Published private(set) var total:Double = 0.0
    
    func addToCart(product: Product){
        products.append(product)
        total += product.price
    }
    func removeCart(product:Product){
        products = products.filter{$0.id != product.id}
        total -= product.price
    }
    
}
