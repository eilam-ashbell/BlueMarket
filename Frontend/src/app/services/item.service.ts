// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { firstValueFrom } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//     providedIn: 'root'
// })
// export class ItemService {

//     constructor(private http: HttpClient) { }

//     // Get all items
//     public async getAllItems(): Promise<ItemModel[]> {
//         const Items = await firstValueFrom(this.http.get<ItemModel[]>(environment.ItemsUrl));
//         return Items;
//     }

//     // Get one item by _id
//     public async getOneItem(_id: number): Promise<ItemModel> {
//         const Item = await firstValueFrom(this.http.get<ItemModel>(environment.ItemsUrl + _id));
//         return Item;
//     }

//     // Add new item
//     public async addItem(Item: ItemModel): Promise<void> {
//         const formData = new FormData();
//         // formData.append("name", Item.name);
//         // formData.append("price", Item.price.toString());
//         // formData.append("stock", Item.stock.toString());
//         // formData.append("image", Item.image);
//         const addedItem = await firstValueFrom(this.http.post<ItemModel>(environment.ItemsUrl, formData));
//         // console.log(addedItem);
//     }

//     // Delete item by _id
//     public async deleteItem(_id: string): Promise<void> {
//         await firstValueFrom(this.http.delete(environment.ItemsUrl + _id));
//     }
// }
