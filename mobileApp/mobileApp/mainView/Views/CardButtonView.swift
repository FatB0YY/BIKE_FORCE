//
//  CardButtonView.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 17.04.2023.
//

import SwiftUI

struct CardButtonView: View {
    var numberOfProducts:Int
    var body: some View {
        ZStack{
            Image(systemName: "cart")
                .padding(.top, 15)
               
                
            
            if numberOfProducts > 0{
                Text("\(numberOfProducts)")
                    .font(.caption2)
                    .bold()
                    .foregroundColor(.white)
                    .frame(width: 15, height: 15)
                    .background(Color(.red))
                    .cornerRadius(50)
                    .padding(.leading, 10)
                    .padding(.top, -3)
            }
        }
        
        
    }
}

struct CardButtonView_Previews: PreviewProvider {
    static var previews: some View {
        CardButtonView(numberOfProducts: 4)
    }
}
