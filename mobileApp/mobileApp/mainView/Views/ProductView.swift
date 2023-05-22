//
//  ProductView.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 16.04.2023.
//

import SwiftUI

struct ProductView: View {
    @EnvironmentObject var cartManager:CartViewModel
    var product:Product
    var body: some View {
        
        VStack(alignment: .center){
            Image(product.img)
                .resizable()
                    .aspectRatio(contentMode: .fit)
                .frame(width: 170, height: 200)
                .background(.gray)
                .cornerRadius(20)
//                .scaledToFit()
           
            HStack{
                Text(product.name)
                    .bold()
                Spacer()
            }.padding(.leading, 20)
            Spacer()
                .frame(height: 10)
            HStack{
                Text("\(product.price.formatted())₽")
                Spacer()
                Button{
                    cartManager.addToCart(product: product)
                }label: {
                   Image(systemName: "cart")
                        .foregroundColor(.black)
//                        .shadow(radius: 32)
                }
                

            }
            .padding(.horizontal, 20)
            
            
     //            }
//            .padding(.all, 8)
//            .frame(width: 180, alignment: .leading)
//            .background(.ultraThinMaterial)
//            .cornerRadius(20)
////            .padding(.bottom, -50)
        }
        .frame(width: 170, height: 200)
        .shadow(radius: 3)
    }
}

struct ProductView_Previews: PreviewProvider {
    static var previews: some View {
        ProductView(product: productList[0])
            .environmentObject(CartViewModel())
    }
}
