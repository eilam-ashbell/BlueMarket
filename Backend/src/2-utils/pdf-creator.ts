import PDFDocument from 'pdfkit'
import fsPromises from "fs/promises";
import fs from "fs";
import { v4 as uuid } from "uuid";
import config from './config';
import cartLogic from '../5-logic/cart-logic';
import { ObjectId } from 'mongoose';
import productLogic from '../5-logic/product-logic';
import { IProductModel } from '../4-models/product-model';

async function createPDF(cartId: ObjectId) {
    
    const cart = await cartLogic.getCartById(cartId);
    // console.log(cart);
    
    const productsIds = cart[0].cartProducts.map( p => p.productId)

    // const products = 
    // productsIds.map( async p => {
    //     await productLogic.getProduct(p)
    // })
    //     console.log(products);
    
    // const doc = new PDFDocument({size: 'A4'});
    // const pdfFileName = uuid() + '.pdf'
    // doc.pipe(fs.createWriteStream(config.pdfFolderPath + pdfFileName)); // write to PDF
    
    // doc.list(cart[0].cartProducts)
    // doc.fontSize(25).text('Here is some vector graphics...', 100, 80);
    
    // doc.end();
}

export default createPDF