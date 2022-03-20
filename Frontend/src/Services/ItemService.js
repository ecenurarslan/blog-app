import { BaseConfig } from "../Config/BaseConfig";
import Fetch from "../Helpers/Fetch";
const ItemService = {
    List(page, pageSize){
        const options={
            method: 'GET',
            headers:BaseConfig.utilities.getAuthorizedHeader()
        };
        return Fetch(`${list}/${page}/${pageSize}`, options);
    },
    ListTopViewed(top){
        const options={
            method: 'GET',
            headers:BaseConfig.utilities.getAuthorizedHeader()
        };
        return Fetch(`${listTopViewed}/${top}`, options);
    },
    Get(id){
        const options={
            method: 'GET',
            headers:BaseConfig.utilities.getAuthorizedHeader()
        };
        return Fetch(`${get}/${id}`, options);
    },
    Delete(id){
        const options={
            method: 'POST',
            headers:BaseConfig.utilities.getAuthorizedHeader(),
            body:id
        };
        return Fetch(deleteUrl, options);
    },
    Edit(obj){
        const options={
            method: 'POST',
            headers:BaseConfig.utilities.getFormDataHeader(),
            body:obj
        };
        return Fetch(update, options);
    },
    GetCategories(){
        const options={
            method: 'GET',
            headers:BaseConfig.utilities.getAuthorizedHeader()
        };
        return Fetch(categories, options);
    },
    Add(obj){
        const options={
            method: 'POST',
            headers:BaseConfig.utilities.getFormDataHeader(),
            body:obj
        };
        return Fetch(add, options);
    },
}

const list = BaseConfig.api.user('/item/list');
const listTopViewed = BaseConfig.api.user('/item/top-viewed');
const get = BaseConfig.api.user('/item');
const deleteUrl = BaseConfig.api.user('/item/delete');
const update = BaseConfig.api.user('/item/update');
const categories = BaseConfig.api.user('/category/list');
const add = BaseConfig.api.user('/item/add');


export default ItemService;
