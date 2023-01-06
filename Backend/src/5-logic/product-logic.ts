import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { v4 as uuid } from "uuid";
import config from "../2-utils/config";
import safeDelete from "../2-utils/safe-delete";
import { CategoryModel, ICategoryModel } from "../4-models/category-model";

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category").sort({ name: 1 }).exec();
}

// Get product by id:
async function getProduct(productId: string): Promise<IProductModel> {
    return ProductModel.findById({ _id: productId }).exec();
}

// Get all categories:
async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

// Get all products by category:
async function getAllProductsByCategory(
    categoryId: string
): Promise<IProductModel[]> {
    return ProductModel.find({ categoryId: categoryId }).exec();
}

// Get all products by search:
async function getAllProductsBySearch(
    searchValue: string
): Promise<IProductModel[]> {
    const regexTerm = new RegExp(searchValue, "i");
    return ProductModel.find({ name: { $regex: regexTerm } }).exec();
}

// Add product:
async function addProduct(product: IProductModel): Promise<IProductModel> {
    // validate data
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    // Handle image
    if (product.image) {
        // Extract image extension
        const extension = product.image.name.substring(
            product.image.name.lastIndexOf(".")
        );
        // Generate new uniq image name
        product.imageName = uuid() + extension;
        // Move image to image folder
        await product.image.mv(config.imageFolderPath + product.imageName);
        // Delete image before inserting to db
        product.image = undefined;
    }
    return product.save();
}

// Update product:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    // Validate data
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    // Handle image
    if (product.image) {
        await safeDelete(config.imageFolderPath + product.imageName); // Delete the previous image
        // Extract image extension
        const extension = product.image.name.substring(
            product.image.name.lastIndexOf(".")
        );
        // Generate new uniq image name
        product.imageName = uuid() + extension;
        // Move image to image folder
        await product.image.mv(config.imageFolderPath + product.imageName);
        // Delete image before inserting to db
        product.image = undefined;
    }
    // update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        product._id,
        product,
        {
            returnOriginal: false,
        }
    ).exec(); // { returnOriginal: false } --> return back db product and not argument Product.
    if (!updatedProduct) throw new IdNotFoundError(product._id);
    return updatedProduct;
}

// Delete product:
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new IdNotFoundError(_id);
    await safeDelete(config.imageFolderPath + deletedProduct.imageName); // Delete the previous image
}

export default {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getAllProductsByCategory,
    getAllProductsBySearch,
};
