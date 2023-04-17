//
//  Product.swift
//  mobileApp
//
//  Created by Islombek Gofurov on 16.04.2023.
//

import Foundation


struct Product{
    var id = UUID()
    var name:String
    var price:Double
    var rating:Int
    var img:String
    var createdAt:Date
    var updatedAt:Date
    var categoryId:Int
    var brandId:Int
    var info:String
}

var products = [
    Product(name: "Горный велосипед",
            price: 19990.99,
            rating: 1,
            img: "01",
            createdAt: Date(),
            updatedAt: Date(),
            categoryId: 1,
            brandId: 1,
            info: "этот велосипед там туда сюда и текста много ++++++ ++++++ =+++++=== +++++="),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 30999.0,
            rating: 3,
            img: "01",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф"),
    Product(name: "Спортивный велосипд",
            price: 31230.0,
            rating: 3,
            img: "01 ",
            createdAt: Date()-200000,
            updatedAt: Date()-195000,
            categoryId: 2,
            brandId: 1,
            info: "самый лучгиевефыоа лдфивыагшфиывшгаф")]
