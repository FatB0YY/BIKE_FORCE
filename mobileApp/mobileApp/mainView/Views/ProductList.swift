//
//  ProductList.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 17.04.2023.
//

import SwiftUI

struct ProductList: View {
    
    @EnvironmentObject var cartManager:CartViewModel
    var columns = [GridItem(.adaptive(minimum: 160),spacing: 30)]
    var body: some View {

        ScrollView{
            Spacer()
                .frame(height: 40)
            LazyVGrid(columns: columns, spacing: 80){
                ForEach(productList, id: \.id){
                    product in
                    ProductView(product: product)
                        .environmentObject(cartManager)
                        
                }
            }.padding()
        }
    }
}

struct ProductList_Previews: PreviewProvider {
    static var previews: some View {
        ProductList()
            .environmentObject(CartViewModel())
    }
}
