
import SwiftUI

struct CartView: View {
    @EnvironmentObject var cartManager:CartViewModel
    
    
    var body: some View {
        VStack{
            if cartManager.products.count > 0{
                ScrollView{
                    
                    ForEach(cartManager.products, id: \.id){product in
                        CartProductView(product: product)
                            .environmentObject(cartManager)
                        
                    }
                   
                }
                Spacer()
                HStack{
                    Text("Полная стоимость всех товаров равна:")
                    
                    Text("\(cartManager.total.formatted())")
                }

            }
            else {
                Text("Ваша корзина пуста")
                Text("Добавьте товары для её пополнения")
            }
            
//                .navigationTitle("Корзина")
//                .padding(.top)
        }
    }
}

struct CartView_Previews: PreviewProvider {
    static var previews: some View {
        CartView()
            .environmentObject(CartViewModel())
    }
}
