//
//  CartProductView.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 17.04.2023.
//

import SwiftUI

struct CartProductView: View {
    @EnvironmentObject var cartManager:CartViewModel
    var product:Product
    var body: some View {
        HStack(spacing: 20){
            Image("\(product.img)")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 100)
                .cornerRadius(10)
            VStack(alignment: .leading, spacing: 10){
                Text(product.name)
                    .bold()
                
                Text("₽ \(product.price.formatted())")
            }
            Spacer()
            Image(systemName: "trash")
                .foregroundColor(.red)
                .onTapGesture {
                    cartManager.removeCart(product: product)
                }
            
        }.padding(.horizontal)
    }
}

struct CartProductView_Previews: PreviewProvider {
    static var previews: some View {
        CartProductView(product: productList[0])
            .environmentObject(CartViewModel())
    }
}
