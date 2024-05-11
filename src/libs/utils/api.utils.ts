
class Api {
    constructor(private readonly baseUrl:string){
    }
    public url(endpoint:string):string{
        return `${this.baseUrl}/${endpoint}`
    }
}
const myApi = new Api("http://localhost:8080");

export {
    myApi
}
