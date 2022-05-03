import { Category } from "./enums/category.enum";
import { Tag } from "./enums/tag.enum";

export class Product {
    _id!: string;
    name!: string;
    category!: Category;
    description?: string;
    tags?: Tag[];
    price!: number;
}