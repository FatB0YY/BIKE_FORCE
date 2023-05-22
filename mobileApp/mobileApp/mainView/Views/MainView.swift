
import SwiftUI

struct MainView: View {
    
    @StateObject var cartManager = CartViewModel()
    @ObservedObject var move = screenMove<Path>()
    var body: some View {
        
        NavigationStack(path: $move.paths){
            
            ProductList()
                .environmentObject(cartManager)
                .navigationTitle("bikeShop")
                .navigationBarBackButtonHidden()
                .toolbar{
                    
                    Button{
                        move.push(.cartV)
                    }label: {
                        CardButtonView(numberOfProducts: cartManager.products.count)
                    }
                }
                .navigationDestination(for: Path.self){path in
                    switch path{
                    case .cartV: CartView()
                            .environmentObject(cartManager)
                    case .enterV: enterView()
                    case .mainV: MainView()
//                    case .productV: ProductMainView()
                            
                    }
                    
                }
            
        }.environmentObject(move)
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
